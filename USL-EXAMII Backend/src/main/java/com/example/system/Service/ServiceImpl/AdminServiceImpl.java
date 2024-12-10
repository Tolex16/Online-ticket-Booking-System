package com.example.system.Service.ServiceImpl;

import com.example.system.Dto.OperatorDto;
import com.example.system.Dto.RouteDto;
import com.example.system.Dto.UserDto;
import com.example.system.Entity.Operators;
import com.example.system.Entity.Passengers;
import com.example.system.Entity.Role;
import com.example.system.Entity.Routes;
import com.example.system.Mappers.Mapper;
import com.example.system.Repository.OperatorRepository;
import com.example.system.Repository.RouteRepository;
import com.example.system.Service.AdminService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final RouteRepository routeRepository;

    private final OperatorRepository operatorRepository;

    private final Mapper<Routes, RouteDto> routeMapper;

//    @Transactional
//    public ResponseEntity<Routes> (RouteDto routeDto){
//        Routes route = new Routes();
//        route.setOrigin(routeDto.getOrigin());
//        route.setDestination(routeDto.getDestination());
//        route.setDepartureDate(LocalDate.parse(routeDto.getDepartureDate()));
//        route.setDepartureTime(LocalTime.parse(routeDto.getDepartureTime()));
//        route.setDuration(routeDto.getDuration());
//        route.setPrice(routeDto.getPrice());
//
//        // Debug logs
//        System.out.println("Saving route: " + route);
//
//        return ResponseEntity.ok(routeRepository.save(route));
//    }

    @Transactional
    public ResponseEntity<Routes> createRoute(RouteDto routeDto){
        Routes route = new Routes();
        route.setOrigin(routeDto.getOrigin());
        route.setDestination(routeDto.getDestination());
        route.setDepartureDate(LocalDate.parse(routeDto.getDepartureDate()));
        route.setDepartureTime(LocalTime.parse(routeDto.getDepartureTime()));
        route.setDuration(routeDto.getDuration());
        route.setPrice(routeDto.getPrice());

        // Debug logs
        System.out.println("Saving route: " + route);

        return ResponseEntity.ok(routeRepository.save(route));
    }

    @Transactional
    public ResponseEntity<RouteDto> updateRoute(RouteDto routeDto, Long routeId) {
        return routeRepository.findById(routeId).map(existingRoute -> {
            Optional.ofNullable(routeDto.getOrigin()).ifPresent(existingRoute::setOrigin);
            Optional.ofNullable(routeDto.getDestination()).ifPresent(existingRoute::setDestination);
            Optional.ofNullable(routeDto.getDuration()).ifPresent(existingRoute::setDuration);
            Optional.ofNullable(routeDto.getDepartureDate())
                    .ifPresent(date -> existingRoute.setDepartureDate(LocalDate.parse(date)));
            Optional.ofNullable(routeDto.getDepartureTime())
                    .ifPresent(time -> existingRoute.setDepartureTime(LocalTime.parse(time)));
            Optional.ofNullable(routeDto.getPrice()).ifPresent(existingRoute::setPrice);

            System.out.println("Updating route with ID: {}" + routeId);

            Routes updatedRoute = routeRepository.save(existingRoute);
            RouteDto savedRouteDto = routeMapper.mapTo(updatedRoute);
            return new ResponseEntity<>(savedRouteDto, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public List<Routes> searchRoutes(String origin, String destination) {
        return routeRepository.findByOriginAndDestination(origin, destination);
    }

    @Transactional
    public void updateOperator(OperatorDto operatorDto) {
        Operators operator = operatorRepository.findById(operatorDto.getOperatorId())
                .orElseThrow(() -> new EntityNotFoundException("Operator not found"));

        if (operatorDto.getRouteId() != null) {
            Routes route = routeRepository.findById(operatorDto.getRouteId())
                    .orElseThrow(() -> new EntityNotFoundException("Route not found"));
            operator.setRoute(route);
        }

        Optional.ofNullable(operatorDto.getSeating()).ifPresent(operator::setSeating);

        operatorRepository.save(operator);
    }

}