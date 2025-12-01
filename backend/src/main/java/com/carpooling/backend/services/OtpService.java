package com.carpooling.backend.services;

import com.carpooling.backend.models.Otp;
import com.carpooling.backend.repositories.OtpRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OtpService {

    private final OtpRepository otpRepo;

    public OtpService(OtpRepository otpRepo) {
        this.otpRepo = otpRepo;
    }

    public String generateOtp(String email) {
        String otp = String.valueOf((int)(Math.random()*900000) + 100000);

        Otp record = otpRepo.findByEmail(email).orElse(new Otp());
        record.setEmail(email);
        record.setCode(otp);
        record.setExpiry(LocalDateTime.now().plusMinutes(5));

        otpRepo.save(record);
        return otp;
    }

    public boolean verifyOtp(String email, String code) {
        Otp otp = otpRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        return otp.getCode().equals(code) &&
               otp.getExpiry().isAfter(LocalDateTime.now());
    }
}
