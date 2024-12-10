package com.example.system.Service;

import com.example.system.Dto.TicketDto;
import com.example.system.Entity.Operators;
import com.example.system.Entity.Passengers;
import com.example.system.Entity.Routes;
import com.example.system.Entity.Tickets;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface PassengerService {
    public ResponseEntity<?> bookTicket(TicketDto ticketDto);

    Optional<Passengers> getPassengerDisplay();

    Iterable<Operators> getAllOperators();

    List<Routes> searchRoutes(String origin, String destination);

    Iterable<Operators> getOperatorsByRoute(Long routeId);

    void cancelTicket(Long ticketId);

    Iterable<Tickets> getTicketsByPassengerId();
}
