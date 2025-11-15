package com.carpooling.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String role;   // "DRIVER" or "PASSENGER"

    private String phone;  // <-- ADD THIS
}
