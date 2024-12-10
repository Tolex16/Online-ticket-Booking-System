package com.example.system.Controller;

import com.example.system.Dto.*;
import com.example.system.Entity.Operators;
import com.example.system.Entity.Passengers;
import com.example.system.Entity.Routes;
import com.example.system.Entity.Tickets;
import com.example.system.Mappers.Mapper;
import com.example.system.Service.PassengerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/passenger")
@RequiredArgsConstructor
public class PassengerController {
    @Autowired
    private final PassengerService passengerService;

    private final Mapper<Passengers, PassengerDto> passengerDisplayMapper;
    private final Mapper<Operators, OperatorDto> operatorMapper;

    private final Mapper<Tickets, TicketDto> ticketMapper;

    @PostMapping("/book-ticket")
    public ResponseEntity<?> bookTicket(@Valid @RequestBody TicketDto ticketDto) {
    return passengerService.bookTicket(ticketDto);
    }

    @GetMapping("/get-passenger-display")
    public ResponseEntity<PassengerDto> getPassengerDisplay() {
        Optional<Passengers> passengerOptional = passengerService.getPassengerDisplay();
        if (passengerOptional.isPresent()) {
            PassengerDto passengerDto = passengerDisplayMapper.mapTo(passengerOptional.get());
            return ResponseEntity.ok(passengerDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/get-operators")
    public ResponseEntity<Iterable<OperatorDto>> getAllOperators() {
        Iterable<Operators> operators = passengerService.getAllOperators();
        Iterable<OperatorDto> allOperators = operatorMapper.mapListTo(operators);
        return ResponseEntity.ok(allOperators);
    }

    @GetMapping("/routes/{origin}/{destination}")
    public List<Routes> getRoutesByOriginDestination(@RequestParam String origin, @RequestParam String destination) {
        List<Routes> routes =passengerService.searchRoutes(origin,destination);
        return routes;
    }

    @GetMapping("/get-operators-route")
    public ResponseEntity<Iterable<OperatorDto>> getAllOperatorsByRoute(Long routeId) {
        Iterable<Operators> operators = passengerService.getOperatorsByRoute(routeId);
        Iterable<OperatorDto> allOperatorsByRoute = operatorMapper.mapListTo(operators);
        return ResponseEntity.ok(allOperatorsByRoute);
    }

    @GetMapping("/all-tickets")
    public ResponseEntity<Iterable<TicketDto>> getTicketsByUserId() {
        Iterable<Tickets> tickets= passengerService.getTicketsByPassengerId();
        Iterable<TicketDto> allTickets = ticketMapper.mapListTo(tickets);
        return ResponseEntity.ok(allTickets);
    }

    @PostMapping("/cancel/{ticketId}")
    public ResponseEntity<String> cancelTicket(@PathVariable Long ticketId) {
        passengerService.cancelTicket(ticketId);
        return ResponseEntity.ok("Ticket canceled successfully!");
    }
}
