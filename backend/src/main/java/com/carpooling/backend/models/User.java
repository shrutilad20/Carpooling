package com.carpooling.backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable=false)
    private String email;

    @Column(nullable=false)
    private String passwordHash;

    private String name;
    private String phone;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
      joinColumns = @JoinColumn(name="user_id"),
      inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles;
}
