package com.example.system.Service;

import com.bookingsystem.BookingSystem.Response.LoginResponse;
import com.example.system.Dto.*;
import com.example.system.Entity.Operators;
import com.example.system.Entity.Passengers;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AuthenticationService {
    ResponseEntity<Passengers> storeUser(UserDto userdto);

    ResponseEntity<Operators> storeOperator(OperatorDto operatorDto);

    LoginResponse login(LoginRequest loginRequest);

    LoginResponse loginOperator(LoginRequest loginRequest);
    LoginResponse loginAdmin(LoginRequest loginRequest);

    String checkMail(String email);

    ResponseEntity<List<RouteDto>> getAllRoutes();

    void createAdminUsers();
}
