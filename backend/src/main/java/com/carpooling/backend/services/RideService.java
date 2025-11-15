package com.carpooling.backend.services;

import com.carpooling.backend.dtos.PostRideRequest;
import com.carpooling.backend.dtos.SearchRideRequest;
import com.carpooling.backend.models.*;
import com.carpooling.backend.repositories.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepo;
    private final UserRepository userRepo;
    public RideService(RideRepository rideRepo, UserRepository userRepo) {
        this.rideRepo = rideRepo;
        this.userRepo = userRepo;
    }

    public Ride postRide(String driverEmail, PostRideRequest req) {

        User driver = userRepo.findByEmail(driverEmail).orElseThrow(() -> new RuntimeException("Driver not found"));
        Ride r = new Ride();
        r.setDriver(driver);
        r.setSource(req.getSource());
        r.setDestination(req.getDestination());
        r.setDepartureTime(req.getDepartureTime());
        r.setTotalSeats(req.getTotalSeats());
        r.setAvailableSeats(req.getTotalSeats());
        r.setBaseFare(req.getBaseFare());
        r.setRatePerKm(req.getRatePerKm());
        return rideRepo.save(r);
    }


    public List<Ride> searchRides(SearchRideRequest req) {
        LocalDateTime from = req.getFrom() == null ? LocalDateTime.now().minusDays(1) : req.getFrom();
        LocalDateTime to = req.getTo() == null ? LocalDateTime.now().plusDays(30) : req.getTo();
        return rideRepo.findBySourceContainingIgnoreCaseAndDestinationContainingIgnoreCaseAndDepartureTimeBetween(
                req.getSource() == null ? "" : req.getSource(),
                req.getDestination() == null ? "" : req.getDestination(),
                from, to
        );
        
    }
}
