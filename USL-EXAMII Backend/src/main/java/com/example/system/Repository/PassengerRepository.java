package com.example.system.Repository;

import com.example.system.Entity.Operators;
import com.example.system.Entity.Role;
import com.example.system.Entity.Passengers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PassengerRepository extends JpaRepository<Passengers, Long> {
 Optional<Passengers> findByEmailIgnoreCase(String email);
// @Query("SELECT * FROM topro_users WHERE email = 'tochukwu.nna-edozie.198790@unn.edu.ng'")
// Optional<UserEntity> searchByEmail(String email);
 Passengers findByRole(Role role);


 Boolean existsByEmail(String email);
}
