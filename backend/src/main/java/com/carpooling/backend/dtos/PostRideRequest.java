package com.carpooling.backend.dtos;
import lombok.Getter; import lombok.Setter;
import java.time.LocalDateTime;
@Getter @Setter
public class PostRideRequest {
  private String source;
  private String destination;
  private LocalDateTime departureTime;
  private Integer totalSeats;
  private Double baseFare;
  private Double ratePerKm;
}
