package com.example.system.Dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class TicketDto {
    
	@Positive(message = "Ticket ID must be a positive number.")
    private Long ticketId;

    @Positive(message = "User ID must be a positive number.")

    private String passengerName;

    private String driverName;

    private String busNumber;

    private String origin;

    private String destination;

    private String departureDate;

    @Positive(message = "Ticket No must be a positive value.")
    private Long ticketNo;
	
    @FutureOrPresent(message = "Booking date and time cannot be in the past.")
    private LocalDateTime bookingDateTime;

    @Future(message = "Cancellation time must be in the future.")
    private LocalDateTime cancellationTime;
	
    @Pattern(regexp = "^[0-9]+\\s(HOURS|MINUTES|DAYS)$", message = "Duration must follow the format: number followed by HOURS, MINUTES, or DAYS.")
    private String estimatedDuration;

    @NotBlank(message = "Seat number is required.")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Seat number must contain only letters and numbers.")
    private String seatNumber;

    @Positive(message = "Price must be a positive value.")
    private double price;

    @NotBlank(message = "Status is required.")
    @Pattern(regexp = "^(BOOKED|CANCELLED|PENDING)$", message = "Status must be BOOKED, CANCELLED, or PENDING.")
    private String status;

    @Positive(message = "Operator ID must be a positive number.")
    private Long operatorId;

    @Positive(message = "Route ID must be a positive number.")
    private Long routeId;
}
