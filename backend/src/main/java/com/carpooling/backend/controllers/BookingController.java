package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.BookingRequest;
import com.carpooling.backend.models.Booking;
import com.carpooling.backend.models.User;
import com.carpooling.backend.services.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Passenger books ride
    @PostMapping
    public ResponseEntity<Booking> bookRide(@RequestBody BookingRequest req) {

        User passenger = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return ResponseEntity.ok(bookingService.bookRide(passenger.getEmail(), req));
    }

    // Passenger views own bookings
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> myBookings() {

        User passenger = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return ResponseEntity.ok(bookingService.getBookingsForPassenger(passenger.getId()));
    }
}
