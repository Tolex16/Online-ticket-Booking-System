package com.example.system.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tickets_test")
@NoArgsConstructor
public class Tickets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long ticketId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Passengers passenger;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id", nullable = false)
    private Routes route;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operator_id", nullable = false)
    private Operators operator;

    @NotBlank(message = "Seat number cannot be blank")
    @Column(name = "seat_number")
    private String seatNumber;

    @Positive(message = "Price must be positive")
    @Column(name = "price", nullable = false)
    private double price;

    @NotBlank(message = "Status cannot be blank")
    @Column(name = "status")
    private String status;

    @Column(name = "booking_date_time", nullable = false)
    private LocalDateTime bookingDateTIME = LocalDateTime.now();

    @Column(name = "cancellation_time")
    private LocalDateTime cancellationTime;

}
