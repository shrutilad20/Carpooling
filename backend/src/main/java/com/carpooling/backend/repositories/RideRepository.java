package com.carpooling.backend.repositories;

import com.carpooling.backend.models.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findBySourceContainingIgnoreCaseAndDestinationContainingIgnoreCaseAndDepartureTimeBetween(
            String source, String destination, LocalDateTime start, LocalDateTime end);
}
