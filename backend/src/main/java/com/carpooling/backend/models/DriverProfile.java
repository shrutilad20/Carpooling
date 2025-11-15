package com.carpooling.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "driver_profiles")
@Getter @Setter @NoArgsConstructor
public class DriverProfile {
    @Id
    private Long userId; // same as User.id

    private String vehicleModel;
    private String licensePlate;
    private Integer capacity;

    @OneToOne
    @MapsId
    @JoinColumn(name="user_id")
    private User user;
}
