package com.carpooling.backend.repositories;

import com.carpooling.backend.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByPassengerId(Long passengerId);
    List<Booking> findByRideId(Long rideId);
}
