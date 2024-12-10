package com.example.system.Service.ServiceImpl;

import com.bookingsystem.BookingSystem.Response.LoginResponse;
import com.example.system.Dto.*;
import com.example.system.Entity.*;
import com.example.system.ExceptionHandling.PassengerNotFoundException;
import com.example.system.ExceptionHandling.UserAlreadyExistsException;
import com.example.system.Mappers.Mapper;
import com.example.system.Repository.AdminRepository;
import com.example.system.Repository.OperatorRepository;
import com.example.system.Repository.PassengerRepository;
import com.example.system.Repository.RouteRepository;
import com.example.system.Service.AuthenticationService;
import com.example.system.Service.JwtService;
import com.example.system.Service.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final UserService userService;

    private final PassengerRepository userRepository;
    @Autowired
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PassengerRepository passengerRepository;

    private final Mapper<Routes, RouteDto> routeMapper;

    private final RouteRepository routeRepository;

    private final OperatorRepository operatorRepository;

    private final AdminRepository adminRepository;

    public ResponseEntity<Passengers> storeUser(UserDto userdto){
        if (userRepository.existsByEmail(userdto.getEmail())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Passengers user = new Passengers();
        user.setFirstName(userdto.getFirstName());
        user.setLastName(userdto.getLastName());
        user.setEmail(userdto.getEmail());
        user.setPhoneNumber(userdto.getPhoneNumber());
        user.setRole(Role.PASSENGER);
        user.setPassword(passwordEncoder.encode(userdto.getPassword()));
        user.setConfirmPassword(passwordEncoder.encode(userdto.getConfirmPassword()));

        return ResponseEntity.ok(userRepository.save(user));
    }
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Invalid student username or password", e);
        }

        // Try to find the user as a passenger first
        var passengerOpt = passengerRepository.findByEmailIgnoreCase(loginRequest.getEmail());
        if (passengerOpt.isPresent()) {
            var passenger = passengerOpt.get();
            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(passenger.getEmail());
            var jwt = jwtService.genToken(userDetails, passenger);

            return new LoginResponse(jwt);

        } else
            throw new PassengerNotFoundException("Passenger not found");

    }

    public LoginResponse loginOperator(LoginRequest loginRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Invalid student username or password", e);
        }

        // Try to find the user as a passenger first
        var operatorOpt = operatorRepository.findByEmailIgnoreCase(loginRequest.getEmail());
        if (operatorOpt.isPresent()) {
            var operator = operatorOpt.get();
            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(operator.getEmail());
            var jwt = jwtService.genToken(userDetails, operator);

            return new LoginResponse(jwt);

        } else
            throw new PassengerNotFoundException("Operator not found");

    }

    public LoginResponse loginAdmin(LoginRequest loginRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Invalid email or password", e);
        }

        // Try to find the user as a passenger first
        var adminOpt = adminRepository.findByEmailIgnoreCase(loginRequest.getEmail());
        if (adminOpt.isPresent()) {
            var admin = adminOpt.get();
            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(admin.getEmail());
            var jwt = jwtService.genToken(userDetails, admin);

            return new LoginResponse(jwt);

        } else
            throw new PassengerNotFoundException("Admin not found");

    }

    public ResponseEntity<Operators> storeOperator(OperatorDto operatorDto){
        if (operatorRepository.existsByEmail(operatorDto.getEmail())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Routes route = routeRepository.findById(operatorDto.getRouteId())
                .orElseThrow(() -> new EntityNotFoundException("Route not found"));

        Operators operator = new Operators();
        operator.setDriverName(operatorDto.getDriverName());
        operator.setEmail(operatorDto.getEmail());
        operator.setPhoneNumber(operatorDto.getPhoneNumber());
        operator.setBusModel(operatorDto.getBusModel());
        operator.setSeating(operatorDto.getSeating());
        operator.setRole(Role.OPERATOR);
        operator.setPassword(passwordEncoder.encode(operatorDto.getPassword()));
        operator.setConfirmPassword(passwordEncoder.encode(operatorDto.getConfirmPassword()));
        operator.setRoute(route);

        return ResponseEntity.ok(operatorRepository.save(operator));
    }

    @Override
    public String checkMail(String email) {
        return passengerRepository.findByEmailIgnoreCase(email).map(
                existingUser -> {
                    String foundEmail = Optional.ofNullable(existingUser.getEmail()).orElse(null);
                    return foundEmail;
                }).orElseThrow(
                () -> new PassengerNotFoundException("Email Not Found!!!")
        );
    }

    @Override
    public ResponseEntity<List<RouteDto>> getAllRoutes() {
        List<RouteDto> routes = routeRepository.findAll()
                .stream()
                .map(routeMapper::mapTo)
                .collect(Collectors.toList());
        return new ResponseEntity<>(routes, HttpStatus.OK);
    }

    @PostConstruct
    public void createAdminUsers() {
        Optional<Admin> adminUser = adminRepository.findByEmailIgnoreCase("onlinebooking@gmail.com");
        if (adminUser.isEmpty()) {
           Admin createAdmin = new Admin();
            createAdmin.setFirstName("Tochukwu");
            createAdmin.setLastName("Okes");
            createAdmin.setEmail("onlinebooking@gmail.com");
            createAdmin.setPassword(passwordEncoder.encode("Teenwolf156$"));
            createAdmin.setRole(Role.ADMIN);
            adminRepository.save(createAdmin);
        }
    }

}
