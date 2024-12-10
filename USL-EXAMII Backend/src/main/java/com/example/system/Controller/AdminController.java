package com.example.system.Controller;

import com.example.system.Dto.OperatorDto;
import com.example.system.Dto.RouteDto;
import com.example.system.Dto.UserDto;
import com.example.system.Entity.Routes;
import com.example.system.Service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    private final AdminService adminService;
 
//    @PostMapping("/create-route")
//    public ResponseEntity<?> createRoute(@Valid @RequestBody RouteDto routeDto) {
//    Routes createdRoute = adminService.createRoute(routeDto).getBody();
//    return ResponseEntity.status(HttpStatus.CREATED).body(createdRoute);
//    }
    @PostMapping("/create-route")
    public ResponseEntity<?> registerPassenger(@Valid @RequestBody RouteDto routeDto, BindingResult result){
        System.out.println("Has errors?" + result.hasErrors());
        if (result.hasErrors()){ return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}
        var createdRoute = adminService.createRoute(routeDto);
        return new ResponseEntity<>( HttpStatus.CREATED);
    }


    @PostMapping("/update-operator") 
    public ResponseEntity<?> updateOperator(@Valid @RequestBody OperatorDto operatorDto) {
    adminService.updateOperator(operatorDto);
    return new ResponseEntity<>("Operator updated successfully!", HttpStatus.CREATED);
    }


    @PostMapping("/update-route/{routeId}")
    public ResponseEntity<?> updateRoute(@Valid @RequestBody RouteDto routeDto, @PathVariable Long routeId) {
    ResponseEntity<RouteDto> response = adminService.updateRoute(routeDto, routeId);
    if (response.getStatusCode() == HttpStatus.OK) {
        return new ResponseEntity<>("Route updated successfully!", HttpStatus.OK);
    } else {
        return new ResponseEntity<>("Route not found!", HttpStatus.NOT_FOUND);
    }
    }
}
