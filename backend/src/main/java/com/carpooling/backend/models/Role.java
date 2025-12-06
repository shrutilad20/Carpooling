package com.carpooling.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // e.g. "ROLE_DRIVER", "ROLE_PASSENGER"
    @Column(unique = true, nullable = false)
    private String name;
}
