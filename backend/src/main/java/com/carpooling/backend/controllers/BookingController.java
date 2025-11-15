package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.BookingRequest;
import com.carpooling.backend.models.Booking;
import com.carpooling.backend.services.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/book")
    public ResponseEntity<Booking> book(@RequestBody BookingRequest req) {
        return ResponseEntity.ok(bookingService.bookRide(req.getPassengerEmail(), req));
    }
}
