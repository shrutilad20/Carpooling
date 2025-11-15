package com.carpooling.backend.repositories;

import com.carpooling.backend.models.DriverProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverProfileRepository extends JpaRepository<DriverProfile, Long> {}
