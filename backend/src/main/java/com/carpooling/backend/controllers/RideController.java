package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.PostRideRequest;
import com.carpooling.backend.dtos.SearchRideRequest;
import com.carpooling.backend.models.Ride;
import com.carpooling.backend.services.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;
import com.carpooling.backend.models.User;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;
    public RideController(RideService rideService) { this.rideService = rideService; }

   @PostMapping("/post")
public ResponseEntity<Ride> postRide(@RequestBody PostRideRequest req) {

    // Get logged-in user from JWT
    User loggedInUser = (User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

    String driverEmail = loggedInUser.getEmail();

    Ride ride = rideService.postRide(driverEmail, req);
    return ResponseEntity.ok(ride);
}
@GetMapping("/my")
public ResponseEntity<?> myPostedRides() {

    User user = (User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

    return ResponseEntity.ok(
            rideService.getRidesByDriver(user.getId())
    );
}
@GetMapping("/{rideId}/bookings")
public ResponseEntity<?> rideBookings(@PathVariable Long rideId) {
    return ResponseEntity.ok(
            rideService.getBookingsForRide(rideId)
    );
}



    @PostMapping("/search")
    public ResponseEntity<List<Ride>> searchRides(@RequestBody SearchRideRequest req) {
        return ResponseEntity.ok(rideService.searchRides(req));
    }
}
