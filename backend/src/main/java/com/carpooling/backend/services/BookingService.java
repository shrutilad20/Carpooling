package com.carpooling.backend.services;

import com.carpooling.backend.dtos.BookingRequest;
import com.carpooling.backend.models.*;
import com.carpooling.backend.repositories.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;
    private final RideRepository rideRepo;
    private final UserRepository userRepo;

    public BookingService(BookingRepository bookingRepo, RideRepository rideRepo, UserRepository userRepo) {
        this.bookingRepo = bookingRepo;
        this.rideRepo = rideRepo;
        this.userRepo = userRepo;
    }

    public Booking bookRide(String passengerEmail, BookingRequest req) {
        User passenger = userRepo.findByEmail(passengerEmail).orElseThrow(() -> new RuntimeException("Passenger not found"));
        Ride ride = rideRepo.findById(req.getRideId()).orElseThrow(() -> new RuntimeException("Ride not found"));

        if (ride.getAvailableSeats() < req.getSeats()) throw new RuntimeException("Not enough seats available");

        // basic fare calc: baseFare + ratePerKm * assumedDistance (we will just use baseFare for now)
        double fare = ride.getBaseFare();

        Booking b = new Booking();
        b.setRide(ride);
        b.setPassenger(passenger);
        b.setSeatsBooked(req.getSeats());
        b.setFareAmount(fare);
        b.setBookedAt(LocalDateTime.now());
        b.setStatus("CONFIRMED");
        Booking saved = bookingRepo.save(b);

        ride.setAvailableSeats(ride.getAvailableSeats() - req.getSeats());
        rideRepo.save(ride);

        return saved;
    }
}
