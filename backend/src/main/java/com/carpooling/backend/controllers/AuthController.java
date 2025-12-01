package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.*;
import com.carpooling.backend.services.AuthService;
import com.carpooling.backend.services.EmailService;
import com.carpooling.backend.services.OtpService;   // ✅ ADD THIS
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final EmailService emailService;

    public AuthController(AuthService authService,
                          OtpService otpService,
                          EmailService emailService) {
        this.authService = authService;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    // -------------------------------
    // 1️⃣ SEND OTP FOR SIGNUP
    // -------------------------------
    @PostMapping("/send-signup-otp")
    public ResponseEntity<?> sendSignupOtp(@RequestBody SignupRequest req) {

        String otp = otpService.generateOtp(req.getEmail());
        emailService.sendOtp(req.getEmail(), otp);

        return ResponseEntity.ok("Signup OTP sent");
    }

    // -------------------------------
    // 2️⃣ VERIFY SIGNUP OTP + CREATE USER
    // -------------------------------
    @PostMapping("/verify-signup-otp")
    public ResponseEntity<AuthResponse> verifySignupOtp(@RequestBody OtpVerifyRequest req) {

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

        return ResponseEntity.ok(authService.signup(signup));
    }

    // -------------------------------
    // 3️⃣ NORMAL LOGIN
    // -------------------------------
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req.getEmail(), req.getPassword()));
    }

    // -------------------------------
    // 4️⃣ SEND OTP FOR LOGIN
    // -------------------------------
    @PostMapping("/send-login-otp")
    public ResponseEntity<?> sendLoginOtp(@RequestBody LoginRequest req) {

        if (!authService.userExists(req.getEmail())) {
            return ResponseEntity.badRequest().body("User not found");
        }

        String otp = otpService.generateOtp(req.getEmail());
        emailService.sendOtp(req.getEmail(), otp);

        return ResponseEntity.ok("Login OTP sent");
    }

    // -------------------------------
    // 5️⃣ VERIFY LOGIN OTP
    // -------------------------------
    @PostMapping("/verify-login-otp")
    public ResponseEntity<AuthResponse> verifyLoginOtp(@RequestBody OtpVerifyRequest req) {

        if (!otpService.verifyOtp(req.getEmail(), req.getOtp())) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, "Invalid or expired OTP", null));
        }

        return ResponseEntity.ok(authService.login(req.getEmail(), req.getPassword()));
    }
}
