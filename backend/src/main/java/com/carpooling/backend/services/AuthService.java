package com.carpooling.backend.services;

import com.carpooling.backend.dtos.SignupRequest;
import com.carpooling.backend.models.User;
import com.carpooling.backend.repositories.UserRepository;
import com.carpooling.backend.utils.JwtUtils;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    // ------------------ SIGNUP AFTER OTP VERIFY --------------------
    public String signup(SignupRequest req) {

        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setName(req.getName());
        user.setPhone(req.getPhone());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));

        userRepo.save(user);

        // Generate JWT token
        return jwtUtils.generateJwtToken(req.getEmail());
    }

    // ------------------ LOGIN --------------------
    public String login(String email, String password) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtils.generateJwtToken(email);
    }
}
