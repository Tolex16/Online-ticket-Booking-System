package com.example.system.Repository;

import com.example.system.Entity.Tickets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Tickets, Long> {
    Iterable<Tickets> findByPassenger_Userid(Long userId);
    List<Tickets> findByRoute_RouteId(Long routeId);
     List<Tickets> findByOperator_OperatorId(Long operatorId);
}