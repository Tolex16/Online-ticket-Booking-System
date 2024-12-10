package com.example.system.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class RouteDto {
    private Long routeId;

    @NotBlank(message = "Origin is required")
    private String origin;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotBlank(message = "Departure date is required")
    private String departureDate;

    @NotBlank(message = "Departure time is required")
    private String departureTime;
    
    @NotBlank(message = "Duration is required")
    private String duration;

    @Positive(message = "Price must be positive")
    private double price;

    private List<OperatorDto> operators;

    private Set<Long> operatorIds;

    private Set<Long> ticketIds;
}
