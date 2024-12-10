package com.example.system.Dto;
;
import com.example.system.Config.StrongPassword;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class PassengerDto {
    private Long passengerId;

    private String firstName;

    private String middleName;

    private String lastName;

    private String fullName;

    @Email(message = "Input a valid email address")
    private String email;

    private String phoneNumber;

    private String address;

    private String nextOfKinName;

    private String nextOfKinNo;

    @StrongPassword
    private String password;

    private List<Long> ticketIds;

}
