package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.SignupRequest;
import com.carpooling.backend.dtos.LoginRequest;
import com.carpooling.backend.dtos.AuthResponse;
import com.carpooling.backend.services.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ---------------- SIGNUP ------------------
   @PostMapping("/signup")
public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest req) {
    String token = authService.register(req);
    return ResponseEntity.ok(new AuthResponse(token, "Signup successful"));
}

@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
    String token = authService.login(req.getEmail(), req.getPassword());
    return ResponseEntity.ok(new AuthResponse(token, "Login successful"));

    }
}
