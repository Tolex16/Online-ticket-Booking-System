package com.example.system.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


public interface UserService {

    UserDetailsService userDetailsService();
}
