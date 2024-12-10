package com.example.system.Dto;


import com.example.system.Config.StrongPassword;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class UserDto {

    private Long userid;

    private String firstName;

    private String middleName;

    private String lastName;

    @Email(message = "Input a valid email address")
    private String email;

    private String phoneNumber;

    @StrongPassword
    private String password;
    @StrongPassword
    private String confirmPassword;
}
