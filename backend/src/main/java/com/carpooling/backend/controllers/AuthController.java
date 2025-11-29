package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.*;
import com.carpooling.backend.services.AuthService;
import com.carpooling.backend.services.EmailService;
import com.carpooling.backend.services.OtpService;
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

    // SEND OTP FOR SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        String otp = otpService.generateOtp(req.getEmail());
        emailService.sendOtp(req.getEmail(), otp);
        return ResponseEntity.ok("OTP sent. Verify to complete signup.");
    }

    // VERIFY OTP (SIGNUP)
    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(@RequestBody OtpVerifyRequest req) {

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

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req.getEmail(), req.getPassword()));
    }
    @PostMapping("/send-login-otp")
public ResponseEntity<?> sendLoginOtp(@RequestBody LoginRequest req) {

    if (!authService.userExists(req.getEmail())) {
        return ResponseEntity.badRequest().body("User not found");
    }

    String otp = otpService.generateOtp(req.getEmail());
    emailService.sendOtp(req.getEmail(), otp);

    return ResponseEntity.ok("OTP sent for login.");
}

}
