package com.carpooling.backend.services;

import com.carpooling.backend.dtos.BookingRequest;
import com.carpooling.backend.models.*;
import com.carpooling.backend.repositories.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {

    private final RideRepository rideRepo;
    private final UserRepository userRepo;
    private final BookingRepository bookingRepo;

    public BookingService(RideRepository rideRepo,
                          UserRepository userRepo,
                          BookingRepository bookingRepo) {
        this.rideRepo = rideRepo;
        this.userRepo = userRepo;
        this.bookingRepo = bookingRepo;
    }

    public List<Booking> getBookingsForPassenger(Long passengerId) {
        return bookingRepo.findByPassengerId(passengerId);
    }

    @Transactional
    public Booking bookRide(String passengerEmail, BookingRequest req) {

        Ride ride = rideRepo.findById(req.getRideId())
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        User passenger = userRepo.findByEmail(passengerEmail)
                .orElseThrow(() -> new RuntimeException("Passenger not found"));

        if (ride.getAvailableSeats() < req.getSeats()) {
            throw new RuntimeException("Not enough seats available");
        }

        ride.setAvailableSeats(ride.getAvailableSeats() - req.getSeats());
        rideRepo.save(ride);

        Booking booking = new Booking();
        booking.setRide(ride);
        booking.setPassenger(passenger);
        booking.setSeats(req.getSeats());

        return bookingRepo.save(booking);
    }
}
