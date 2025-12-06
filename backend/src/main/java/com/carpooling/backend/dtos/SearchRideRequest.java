package com.carpooling.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class SearchRideRequest {

    private String source;
    private String destination;

    private LocalDateTime from;
    private LocalDateTime to;
}
