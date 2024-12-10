package com.example.system.Dto;

import com.example.system.Config.StrongPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class OperatorDto {

    private Long operatorId;

    private String driverName;

    @Email(message = "Input a valid email address")
    private String email;

    private String busNumber;

    private String busModel;
	
	@NotNull(message = "Seating capacity cannot be null")
	@Positive(message = "Seating capacity must be positive")
    private int seating;

    private Long routeId;

    private String origin;

    private String destination;

    private String phoneNumber;

    @StrongPassword
    private String password;
    @StrongPassword
    private String confirmPassword;

}
