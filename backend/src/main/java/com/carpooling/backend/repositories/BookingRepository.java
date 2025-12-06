package com.carpooling.backend.repositories;

import com.carpooling.backend.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByPassengerId(Long passengerId);

    List<Booking> findByRideId(Long rideId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.ride.driver.id = :driverId")
    int countByDriverRides(Long driverId);
}
