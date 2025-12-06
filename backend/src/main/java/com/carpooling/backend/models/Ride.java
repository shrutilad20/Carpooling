package com.carpooling.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "rides")
@Getter @Setter @NoArgsConstructor
public class Ride {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "driver_id")
    private User driver;

    private String source;
    private String destination;

    private LocalDateTime departureTime;

    private Integer totalSeats;
    private Integer availableSeats;

    private Double baseFare;   // starting fare (per seat)
    private Double ratePerKm;  // Rs per km for dynamic fare
}
