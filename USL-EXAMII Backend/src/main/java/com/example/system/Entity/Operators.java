package com.example.system.Entity;

import com.example.system.Config.StrongPassword;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "operators_test")
public class Operators implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operator_id")
    private Long operatorId;

    @NotBlank(message = "Driver name cannot be blank")
    @Column(name = "driver_name")
    private String driverName;

    @Email(message = "Input a valid email address")
    @NotNull(message = "Email is required")
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Phone number cannot be blank")
    @Column(name = "phone_number")
    private String phoneNumber;

    @JsonIgnore
    @NotBlank(message = "Password is required")
    @Column(name = "password", nullable = false)
    private String password;

    @JsonIgnore
    @NotBlank(message = "Confirm password is required")
    @Column(name = "confirm_password", nullable = false)
    private String confirmPassword;

    @NotBlank(message = "Bus number cannot be blank")
    @Column(name = "bus_number", unique = true, nullable = false)
    private String busNumber;

    @Column(name = "bus_model")
    private String busModel;

    @Column(name = "seating", nullable = false)
    private int seating;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id", nullable = false)
    private Routes route;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
