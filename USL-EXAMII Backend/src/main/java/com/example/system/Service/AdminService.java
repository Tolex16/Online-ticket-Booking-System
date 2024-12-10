package com.example.system.Service;

import com.example.system.Dto.OperatorDto;
import com.example.system.Dto.RouteDto;
import com.example.system.Entity.Routes;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminService {
    ResponseEntity<Routes> createRoute(RouteDto routeDto);

    List<Routes> searchRoutes(String origin, String destination);

    ResponseEntity<RouteDto> updateRoute(RouteDto routeDto, Long routeId);

    void updateOperator(OperatorDto operatorDto);
}
