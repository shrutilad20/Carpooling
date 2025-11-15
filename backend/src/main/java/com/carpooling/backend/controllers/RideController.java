package com.carpooling.backend.controllers;

import com.carpooling.backend.dtos.PostRideRequest;
import com.carpooling.backend.dtos.SearchRideRequest;
import com.carpooling.backend.models.Ride;
import com.carpooling.backend.services.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;
    public RideController(RideService rideService) { this.rideService = rideService; }

    @PostMapping("/post")
    public ResponseEntity<Ride> postRide(@RequestParam String driverEmail, @RequestBody PostRideRequest req) {
        Ride ride = rideService.postRide(driverEmail, req);
        return ResponseEntity.ok(ride);
    }

    @PostMapping("/search")
    public ResponseEntity<List<Ride>> searchRides(@RequestBody SearchRideRequest req) {
        return ResponseEntity.ok(rideService.searchRides(req));
    }
}
