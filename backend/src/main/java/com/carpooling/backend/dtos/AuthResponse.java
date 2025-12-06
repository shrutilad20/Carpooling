package com.carpooling.backend.dtos;

import lombok.*;

@Getter @Setter @AllArgsConstructor
public class AuthResponse {
    private String token;
    private String message;
    private String role;
}
