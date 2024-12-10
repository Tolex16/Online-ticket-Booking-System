package com.example.system.Service.ServiceImpl;

import com.example.system.Dto.OperatorDto;
import com.example.system.Dto.TicketDto;
import com.example.system.Entity.*;
import com.example.system.ExceptionHandling.OperatorNotFoundException;
import com.example.system.ExceptionHandling.PassengerNotFoundException;
import com.example.system.Repository.OperatorRepository;
import com.example.system.Repository.PassengerRepository;
import com.example.system.Repository.RouteRepository;
import com.example.system.Repository.TicketRepository;
import com.example.system.Service.JwtService;
import com.example.system.Service.PassengerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PassengerServiceImpl implements PassengerService {
    private final TicketRepository ticketRepository;

    @Autowired
    private JwtService jwtService;
    private final PassengerRepository passengerRepository;

    private final OperatorRepository operatorRepository;

    private final RouteRepository routeRepository;

    public Optional<Passengers> getPassengerDisplay() {
        Long passengerId = jwtService.getPassengerId();
        return passengerRepository.findById(passengerId);

    }

  @Transactional
  public ResponseEntity<?> bookTicket(TicketDto ticketDto) {
    // Retrieve Passenger ID from JWT service
    Long passengerId = jwtService.getPassengerId();

    // Find Passenger
    Passengers passenger = passengerRepository.findById(passengerId)
            .orElseThrow(() -> new PassengerNotFoundException("Passenger not found"));

    // Find Operator
    Operators operator = operatorRepository.findById(ticketDto.getOperatorId())
            .orElseThrow(() -> new OperatorNotFoundException("Operator not found"));

    // Validate seat availability
    if (operator.getSeating() <= 0) {
        throw new IllegalStateException("No seats available.");
    }

    // Retrieve associated route from operator
    Routes route = operator.getRoute();
    if (route == null) {
        throw new IllegalStateException("Route not associated with the operator.");
    }

    // Create and populate a new Ticket entity
    Tickets ticket = new Tickets();
    ticket.setPassenger(passenger);
    ticket.setOperator(operator);
    ticket.setRoute(route);
    ticket.setSeatNumber(ticketDto.getSeatNumber());
    ticket.setPrice(route.getPrice());
    ticket.setStatus("BOOKED");
    ticket.setCancellationTime(null);
    ticket.setBookingDateTIME(LocalDateTime.now());

    // Save ticket to the database
    ticketRepository.save(ticket);

    // Update operator seating and persist the change
    operator.setSeating(operator.getSeating() - 1);
    operatorRepository.save(operator);

    return new ResponseEntity<>("Ticket booked successfully!", HttpStatus.ACCEPTED);
}


    public Iterable<Operators> getAllOperators() {
        Iterable<Operators> operators = operatorRepository.findAll();
        return operators;
    }

    public List<Routes> searchRoutes(String origin, String destination) {
        return routeRepository.findByOriginAndDestination(origin, destination);
    }

    public Iterable<Operators> getOperatorsByRoute(Long routeId) {
        Iterable<Operators> operators = operatorRepository.findByRoute_RouteId(routeId);
        return operators;
    }

    public Iterable<Tickets> getTicketsByPassengerId() {
        Long passengerId = jwtService.getPassengerId();
        Iterable<Tickets> tickets = ticketRepository.findByPassenger_Userid(passengerId);
        return tickets;
    }
	
    @Transactional
    public void cancelTicket(Long ticketId) {
    Tickets ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

    if (ticket.getCancellationTime() != null) {
        throw new IllegalStateException("Ticket already canceled.");
    }

    // Optionally, ensure the booking date is not null before clearing it
    ticket.setStatus("CANCELLED");
    ticket.setCancellationTime(LocalDateTime.now());
    ticketRepository.save(ticket);

    // Update operator seating capacity
    Operators operator = ticket.getOperator();
    operator.setSeating(operator.getSeating() + 1);
    operatorRepository.save(operator);
}

//    @Override
//    public ResponseEntity<List<Ticket>> getTicketsByPassengerId(Long passengerId) {
//        List<Ticket> tickets = ticketRepository.findByPassenger_PassengerId(passengerId);
//        return new ResponseEntity<>(tickets, HttpStatus.OK);
//    }


}
