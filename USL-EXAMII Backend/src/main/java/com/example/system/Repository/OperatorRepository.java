package com.example.system.Repository;


import com.example.system.Entity.Operators;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface OperatorRepository extends JpaRepository<Operators, Long> {
    Optional<Operators> findByEmailIgnoreCase(String email);
    //UserEntity findByRole(Role role);
    Boolean existsByEmail(String email);

//    Iterable<Operators> findAllOperators();

    Iterable<Operators> findByRoute_RouteId(Long routeId);
}
