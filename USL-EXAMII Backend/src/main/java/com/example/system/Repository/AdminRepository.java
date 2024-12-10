package com.example.system.Repository;

import com.example.system.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmailIgnoreCase(String email);
    //UserEntity findByRole(Role role);
    Boolean existsByEmail(String email);
}
