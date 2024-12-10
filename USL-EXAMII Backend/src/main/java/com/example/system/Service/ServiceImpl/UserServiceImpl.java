package com.example.system.Service.ServiceImpl;


import com.example.system.Repository.AdminRepository;
import com.example.system.Repository.OperatorRepository;
import com.example.system.Repository.PassengerRepository;
import com.example.system.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final PassengerRepository passengerRepository;

    private final OperatorRepository operatorRepository;

    private final AdminRepository adminRepository;


    @Override
	public UserDetailsService userDetailsService() {
    return new UserDetailsService() {
    @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    if (username == null || username.trim().isEmpty()) {
        throw new UsernameNotFoundException("Username cannot be null or empty");
    }

    var passengerOpt = passengerRepository.findByEmailIgnoreCase(username);
    if (passengerOpt.isPresent()) {
        return passengerOpt.get();
    }

    var operatorOpt = operatorRepository.findByEmailIgnoreCase(username);
    if (operatorOpt.isPresent()) {
        return operatorOpt.get();
    }

    var adminOpt = adminRepository.findByEmailIgnoreCase(username);
    if (adminOpt.isPresent()) {
        return adminOpt.get();
    }

    throw new UsernameNotFoundException("User not found: " + username);
   }};
}

}
