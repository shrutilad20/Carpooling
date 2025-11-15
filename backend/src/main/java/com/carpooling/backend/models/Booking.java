package com.carpooling.backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter @Setter @NoArgsConstructor
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="ride_id", nullable=false)
    private Ride ride;

    @ManyToOne
    @JoinColumn(name="passenger_id", nullable=false)
    private User passenger;

    private Integer seatsBooked;
    private Double fareAmount;
    private LocalDateTime bookedAt;
    private String status; // CONFIRMED, CANCELLED, COMPLETED
}
