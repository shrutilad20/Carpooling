package com.carpooling.backend.controllers;

import com.carpooling.backend.models.Booking;
import com.carpooling.backend.models.User;
import com.carpooling.backend.repositories.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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

        // Get logged-in passenger from JWT
        User passenger = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Long passengerId = passenger.getId();

        // Fetch all bookings
        List<Booking> allBookings = bookingRepo.findByPassengerId(passengerId);

        // Upcoming rides
        List<Booking> upcoming = allBookings.stream()
                .filter(b -> b.getRide().getDepartureTime().isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());

        // Past rides
        List<Booking> past = allBookings.stream()
                .filter(b -> b.getRide().getDepartureTime().isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                Map.of(
                        "passenger", passenger.getName(),
                        "totalBookings", allBookings.size(),
                        "upcoming", upcoming,
                        "past", past
                )
        );
    }
}
