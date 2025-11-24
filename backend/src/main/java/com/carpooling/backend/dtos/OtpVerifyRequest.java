package com.carpooling.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OtpVerifyRequest {
    private String email;
    private String otp;
    private String name;
    private String password;
    private String phone;
}
