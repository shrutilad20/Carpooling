package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.PostRideRequest;
import com.carpooling.backend.dtos.SearchRideRequest;
import com.carpooling.backend.models.Ride;
import com.carpooling.backend.models.User;
import com.carpooling.backend.services.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) { this.rideService = rideService; }

    // Driver posts a ride
    @PostMapping("/post")
    public ResponseEntity<Ride> postRide(@RequestBody PostRideRequest req) {

        User driver = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Ride ride = rideService.postRide(driver.getEmail(), req);
        return ResponseEntity.ok(ride);
    }

    // Driver's rides
    @GetMapping("/my")
    public ResponseEntity<?> myPostedRides() {

        User driver = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return ResponseEntity.ok(rideService.getRidesByDriver(driver.getId()));
    }

    // Bookings for a ride (for driver dashboard)
    @GetMapping("/{rideId}/bookings")
    public ResponseEntity<?> rideBookings(@PathVariable Long rideId) {
        return ResponseEntity.ok(rideService.getBookingsForRide(rideId));
    }

    // Search rides (passengers)
    @PostMapping("/search")
    public ResponseEntity<List<Ride>> searchRides(@RequestBody SearchRideRequest req) {
        return ResponseEntity.ok(rideService.searchRides(req));
    }

    // Get single ride details
    @GetMapping("/{rideId}")
    public ResponseEntity<Ride> getRide(@PathVariable Long rideId) {
        return ResponseEntity.ok(rideService.getById(rideId));
    }
}
