package com.carpooling.backend.services;

import com.carpooling.backend.dtos.SignupRequest;
import com.carpooling.backend.models.*;
import com.carpooling.backend.repositories.*;
import com.carpooling.backend.utils.JwtUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final DriverProfileRepository driverProfileRepo;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepo, RoleRepository roleRepo,
                       DriverProfileRepository driverProfileRepo, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.driverProfileRepo = driverProfileRepo;
        this.jwtUtils = jwtUtils;
    }

    public String register(SignupRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User u = new User();
        u.setEmail(req.getEmail());
        u.setName(req.getName());
        u.setPhone(req.getPhone());
        u.setPasswordHash(passwordEncoder.encode(req.getPassword()));

        String roleName = req.getRole() == null ? "ROLE_PASSENGER" : ("ROLE_DRIVER".equalsIgnoreCase(req.getRole()) ? "ROLE_DRIVER" : "ROLE_PASSENGER");
        Role role = roleRepo.findByName(roleName).orElseGet(() -> roleRepo.save(new Role(null, roleName)));
        u.setRoles(Collections.singleton(role));
        userRepo.save(u);

        if ("ROLE_DRIVER".equals(roleName)) {
            DriverProfile dp = new DriverProfile();
            dp.setUser(u);
            dp.setCapacity(4); // default
            driverProfileRepo.save(dp);
        }
        return jwtUtils.generateJwtToken(u.getEmail());
    }

    public String login(String email, String password) {
        User u = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(password, u.getPasswordHash())) throw new RuntimeException("Invalid credentials");
        return jwtUtils.generateJwtToken(u.getEmail());
    }
}
