package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.*;
import com.carpooling.backend.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final EmailService emailService;

    public AuthController(AuthService authService, OtpService otpService, EmailService emailService) {
        this.authService = authService;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    // 1️⃣ Send Signup OTP
    @PostMapping("/send-signup-otp")
    public ResponseEntity<?> sendSignupOtp(@RequestBody Map<String, String> req) {

        String email = req.get("email");

        if (email == null || email.isEmpty())
            return ResponseEntity.badRequest().body("Email required");

        String otp = otpService.generateOtp(email);
        emailService.sendOtp(email, otp);

        return ResponseEntity.ok("Signup OTP sent");
    }

    // 2️⃣ Verify OTP + Signup
    @PostMapping("/verify-signup-otp")
    public ResponseEntity<?> verifySignupOtp(@RequestBody OtpVerifyRequest req) {

        if (!otpService.verifyOtp(req.getEmail(), req.getOtp())) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, "Invalid or expired OTP", null));
        }

        SignupRequest signup = new SignupRequest();
        signup.setEmail(req.getEmail());
        signup.setPassword(req.getPassword());
        signup.setName(req.getName());
        signup.setPhone(req.getPhone());
        signup.setRole(req.getRole());

        AuthResponse response = authService.signup(signup);

        return ResponseEntity.ok(response);
    }

    // 3️⃣ Normal Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req.getEmail(), req.getPassword()));
    }

    // 4️⃣ Send OTP for Login
    @PostMapping("/send-login-otp")
    public ResponseEntity<?> sendLoginOtp(@RequestBody Map<String, String> req) {

        String email = req.get("email");

        if (email == null || email.isEmpty())
            return ResponseEntity.badRequest().body("Email required");

        if (!authService.userExists(email))
            return ResponseEntity.badRequest().body("User not found");

        String otp = otpService.generateOtp(email);
        emailService.sendOtp(email, otp);

        return ResponseEntity.ok("Login OTP sent");
    }

    // 5️⃣ Verify Login OTP
    @PostMapping("/verify-login-otp")
    public ResponseEntity<AuthResponse> verifyLoginOtp(@RequestBody OtpVerifyRequest req) {

        if (!otpService.verifyOtp(req.getEmail(), req.getOtp()))
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, "Invalid or expired OTP", null));

        return ResponseEntity.ok(authService.loginViaOtp(req.getEmail()));
    }
}
