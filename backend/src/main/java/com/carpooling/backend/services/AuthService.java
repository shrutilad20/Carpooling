package com.carpooling.backend.services;

import com.carpooling.backend.dtos.*;
import com.carpooling.backend.models.*;
import com.carpooling.backend.repositories.*;
import com.carpooling.backend.utils.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepo, RoleRepository roleRepo,
                       PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    public AuthResponse signup(SignupRequest req) {

        if (userRepo.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already registered");

        Role role = roleRepo.findByName("ROLE_" + req.getRole().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Invalid role"));

        User user = new User();
        user.setEmail(req.getEmail());
        user.setName(req.getName());
        user.setPhone(req.getPhone());
        user.setPasswordHash(encoder.encode(req.getPassword()));
        user.setRoles(Collections.singleton(role));

        userRepo.save(user);

        String token = jwtUtils.generateJwtToken(req.getEmail());
        return new AuthResponse(token, "Signup successful", role.getName());
    }

    public AuthResponse login(String email, String password) {
        User u = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, u.getPasswordHash()))
            throw new RuntimeException("Invalid password");

        String token = jwtUtils.generateJwtToken(email);
        String role = u.getRoles().iterator().next().getName();

        return new AuthResponse(token, "Login successful", role);
    }

    public boolean userExists(String email) {
        return userRepo.existsByEmail(email);
    }

    public AuthResponse loginViaOtp(String email) {
        User u = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateJwtToken(email);
        String role = u.getRoles().iterator().next().getName();

        return new AuthResponse(token, "Login successful", role);
    }
}
