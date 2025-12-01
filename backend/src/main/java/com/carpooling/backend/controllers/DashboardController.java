package com.carpooling.backend.controllers;

import com.carpooling.backend.models.User;
import com.carpooling.backend.repositories.RideRepository;
import com.carpooling.backend.repositories.BookingRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DashboardController {

    private final RideRepository rideRepo;
    private final BookingRepository bookingRepo;

    public DashboardController(RideRepository rideRepo, BookingRepository bookingRepo) {
        this.rideRepo = rideRepo;
        this.bookingRepo = bookingRepo;
    }

    // -------------------- DRIVER DASHBOARD --------------------
    @GetMapping("/dashboard/driver")
    public ResponseEntity<?> driverDashboard() {

        User driver = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Long driverId = driver.getId();

        int totalRides = rideRepo.countByDriverId(driverId);
        int totalBookings = bookingRepo.countByDriverRides(driverId);

        return ResponseEntity.ok(
                Map.of(
                        "name", driver.getName(),
                        "totalRides", totalRides,
                        "totalBookings", totalBookings
                )
        );
    }
}
