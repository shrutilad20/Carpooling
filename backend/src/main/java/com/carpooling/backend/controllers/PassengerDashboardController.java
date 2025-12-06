package com.carpooling.backend.controllers;

import com.carpooling.backend.models.Booking;
import com.carpooling.backend.models.User;
import com.carpooling.backend.repositories.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/passenger")
public class PassengerDashboardController {

    private final BookingRepository bookingRepo;

    public PassengerDashboardController(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {

        User passenger = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Long passengerId = passenger.getId();

        List<Booking> all = bookingRepo.findByPassengerId(passengerId);

        List<Booking> upcoming = all.stream()
                .filter(b -> b.getRide().getDepartureTime().isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());

        List<Booking> past = all.stream()
                .filter(b -> b.getRide().getDepartureTime().isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());

        Map<String, Object> body = new HashMap<>();
        body.put("passenger", passenger.getName());
        body.put("totalBookings", all.size());
        body.put("upcoming", upcoming);
        body.put("past", past);

        return ResponseEntity.ok(body);
    }
}
