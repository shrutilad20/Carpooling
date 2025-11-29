package com.carpooling.backend.services;

import com.carpooling.backend.dtos.AuthResponse;
import com.carpooling.backend.dtos.SignupRequest;
import com.carpooling.backend.models.Role;
import com.carpooling.backend.models.User;
import com.carpooling.backend.repositories.RoleRepository;
import com.carpooling.backend.repositories.UserRepository;
import com.carpooling.backend.utils.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepo,
                       RoleRepository roleRepo,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    // SIGNUP after OTP verification
    public AuthResponse signup(SignupRequest req) {

        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        Role role = roleRepo.findByName("ROLE_" + req.getRole().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Invalid role"));

        User user = new User();
        user.setEmail(req.getEmail());
        user.setName(req.getName());
        user.setPhone(req.getPhone());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setRoles(Collections.singleton(role));

        userRepo.save(user);

        String token = jwtUtils.generateJwtToken(req.getEmail());

        return new AuthResponse(token, "Signup successful", role.getName());
    }

    // LOGIN
    public AuthResponse login(String email, String password) {

    System.out.println("LOGIN REQUEST START");
    System.out.println("Email: " + email);
    System.out.println("Password: " + password);

    User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    System.out.println("User found: " + user.getEmail());
    System.out.println("Stored Hash: " + user.getPasswordHash());

    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
        System.out.println("PASSWORD DOES NOT MATCH");
        throw new RuntimeException("Invalid password");
    }

    System.out.println("PASSWORD MATCHED");

    String token = jwtUtils.generateJwtToken(email);
    String role = user.getRoles().stream()
            .map(Role::getName)
            .findFirst()
            .orElse("ROLE_USER");

    System.out.println("User Role: " + role);
    System.out.println("LOGIN SUCCESS");

    return new AuthResponse(token, "Login successful", role);
}
// inside AuthService

public boolean userExists(String email) {
    return userRepo.findByEmail(email).isPresent();
}

public AuthResponse loginViaOtp(String email) {
    User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    String token = jwtUtils.generateJwtToken(email);
    String role = user.getRoles().iterator().next().getName();

    return new AuthResponse(token, "Login successful", role);
}


}
