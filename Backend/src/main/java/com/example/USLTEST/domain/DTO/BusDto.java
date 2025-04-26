package com.example.USLTEST.domain.DTO;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BusDto {
    private Long busId;
    private String busNumber;
    private String busModel;
    private String driverName;
    private String phoneNumber;
    @NotBlank(message = "Origin is required")
    private String origin;

    @NotBlank(message = "Destination is required")
    private String destination;
    @NotBlank(message = "Departure date is required")
    private LocalDate departureDate;

    @NotBlank(message = "Departure time is required")
    private LocalTime departureTime;
    @NotNull(message = "Seating capacity cannot be null")
    @Positive(message = "Seating capacity must be positive")
    private int capacity;
    private Long userId;  // Reference to the associated user
    private Long routeId; // Reference to the associated route
}
