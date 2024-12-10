package com.example.system.Repository;

import com.example.system.Entity.Routes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Routes, Long> {
    List<Routes> findByOriginAndDestination(String origin, String destination);;
}
