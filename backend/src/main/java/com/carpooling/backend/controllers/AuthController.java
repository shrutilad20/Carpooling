package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.SignupRequest;
import com.carpooling.backend.dtos.LoginRequest;
import com.carpooling.backend.dtos.OtpVerifyRequest;
import com.carpooling.backend.dtos.AuthResponse;
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

public AuthController(AuthService authService, OtpService otpService, EmailService emailService) {
    this.authService = authService;
    this.otpService = otpService;
    this.emailService = emailService;
}


    // ---------------- SIGNUP ------------------
  @PostMapping("/signup")
public ResponseEntity<?> signup(@RequestBody SignupRequest req) {

    String otp = otpService.generateOtp(req.getEmail());
    emailService.sendOtp(req.getEmail(), otp);

    return ResponseEntity.ok("OTP sent to email. Please verify.");
}
@PostMapping("/verify-otp")
public ResponseEntity<?> verifyOtp(@RequestBody OtpVerifyRequest req) {

    if (!otpService.verifyOtp(req.getEmail(), req.getOtp())) {
        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    // On success → register user + return JWT token
    SignupRequest signup = new SignupRequest();
    signup.setEmail(req.getEmail());
    signup.setName(req.getName());
    signup.setPassword(req.getPassword());
    signup.setPhone(req.getPhone());

    String token = authService.signup(signup);

    return ResponseEntity.ok(new AuthResponse(token, "OTP verified. Signup complete."));
}


@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
    String token = authService.login(req.getEmail(), req.getPassword());
    return ResponseEntity.ok(new AuthResponse(token, "Login successful"));

    }

    
}
