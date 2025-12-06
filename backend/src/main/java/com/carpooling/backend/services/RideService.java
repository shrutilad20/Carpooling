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
    private final BookingRepository bookingRepo;

    public RideService(RideRepository rideRepo,
                       UserRepository userRepo,
                       BookingRepository bookingRepo) {
        this.rideRepo = rideRepo;
        this.userRepo = userRepo;
        this.bookingRepo = bookingRepo;
    }

    // Driver posts ride
    public Ride postRide(String driverEmail, PostRideRequest req) {

        User driver = userRepo.findByEmail(driverEmail)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

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

    public List<Ride> getRidesByDriver(Long driverId) {
        return rideRepo.findByDriverId(driverId);
    }

    public List<Booking> getBookingsForRide(Long rideId) {
        return bookingRepo.findByRideId(rideId);
    }

    public List<Ride> searchRides(SearchRideRequest req) {

        LocalDateTime from = req.getFrom() != null
                ? req.getFrom()
                : LocalDateTime.now().minusDays(1);

        LocalDateTime to = req.getTo() != null
                ? req.getTo()
                : LocalDateTime.now().plusDays(30);

        String src = (req.getSource() == null) ? "" : req.getSource();
        String dest = (req.getDestination() == null) ? "" : req.getDestination();

        return rideRepo
                .findBySourceContainingIgnoreCaseAndDestinationContainingIgnoreCaseAndDepartureTimeBetween(
                        src, dest, from, to
                );
    }

    public Ride getById(Long rideId) {
        return rideRepo.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }
}
