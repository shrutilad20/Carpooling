package com.carpooling.backend.dtos;

import lombok.Data;

@Data
public class OtpVerifyRequest {

    private String email;    // Required for OTP lookup
    private String otp;      // OTP entered by user

    // For signup only
    private String name;
    private String phone;
    private String password;
    private String role;

    // For login OTP verify (no signup fields needed)
}
