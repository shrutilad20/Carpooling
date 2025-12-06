package com.carpooling.backend.services;

import com.carpooling.backend.models.Otp;
import com.carpooling.backend.repositories.OtpRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OtpService {

    private final OtpRepository otpRepo;

    public OtpService(OtpRepository otpRepo) { this.otpRepo = otpRepo; }

    public String generateOtp(String email) {
        String otp = String.valueOf((int)(Math.random()*900000 + 100000));

        Otp record = otpRepo.findByEmail(email).orElse(new Otp());
        record.setEmail(email);
        record.setCode(otp);
        record.setExpiry(LocalDateTime.now().plusMinutes(5));

        otpRepo.save(record);
        return otp;
    }

    public boolean verifyOtp(String email, String code) {

        Otp otp = otpRepo.findByEmail(email).orElse(null);
        if (otp == null) return false;

        if (otp.getExpiry().isBefore(LocalDateTime.now())) {
            otpRepo.delete(otp);
            return false;
        }

        boolean valid = otp.getCode().equals(code);

        if (valid) otpRepo.delete(otp);

        return valid;
    }

    public void clearOtp(String email) {
        otpRepo.findByEmail(email).ifPresent(otpRepo::delete);
    }
}
