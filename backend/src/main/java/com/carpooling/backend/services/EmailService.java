package com.carpooling.backend.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtp(String email, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Your OTP Code");
            message.setText("Your OTP is: " + otp + "\nValid for 5 minutes.");

            mailSender.send(message);
            System.out.println("OTP email sent successfully to: " + email);

        } catch (Exception e) {
            System.err.println("ERROR sending OTP email: " + e.getMessage());
            throw new RuntimeException("Failed to send email");
        }
    }
}
