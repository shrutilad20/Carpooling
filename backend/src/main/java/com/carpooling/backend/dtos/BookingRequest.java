package com.carpooling.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {

    private String passengerEmail; // Add this field
    private Long rideId;
    private Integer seats;
}
