package com.example.system.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "routes_local")
public class Routes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @NotBlank(message = "Origin cannot be blank")
    @Column(name = "origin")
    private String origin;

    @NotBlank(message = "Destination cannot be blank")
    @Column(name = "destination")
    private String destination;

    @NotNull(message = "Date cannot be null")
    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @NotNull(message = "Departure time cannot be null")
    @Column(name = "departure_time", nullable = false)
    private LocalTime departureTime;
	
	@Positive(message = "Price must be positive")
    @Column(name = "price", nullable = false)
    private double price;

    @NotBlank(message = "Duration cannot be blank")
    @Column(name = "duration")
    private String duration;

    @OneToMany(mappedBy = "route", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private Set<Operators> operators;

    @OneToMany(mappedBy = "route", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private Set<Tickets> tickets;
}
