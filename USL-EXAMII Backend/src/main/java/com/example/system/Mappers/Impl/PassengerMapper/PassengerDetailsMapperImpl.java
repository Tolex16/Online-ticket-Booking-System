package com.example.system.Mappers.Impl.PassengerMapper;

import com.example.system.Dto.PassengerDto;
import com.example.system.Entity.Passengers;
import com.example.system.Mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class PassengerDetailsMapperImpl implements Mapper<Passengers, PassengerDto> {

    private final ModelMapper modelMapper;

 @Override
    public PassengerDto mapTo(Passengers passenger) {
        PassengerDto passengerDto = new PassengerDto();

        passengerDto.setPassengerId(passenger.getUserid());
        passengerDto.setFullName(passenger.getFirstName() + " " + passenger.getLastName());
        passengerDto.setPhoneNumber(passenger.getPhoneNumber());

        return passengerDto;
    }

    @Override
    public Passengers mapFrom(PassengerDto passengerDto) {
        return modelMapper.map(passengerDto, Passengers.class);
    }

    @Override
    public Iterable<PassengerDto> mapListTo(Iterable<Passengers> passengers) {
        return StreamSupport.stream(passengers.spliterator(), false)
                .map(this::mapTo)
                .collect(Collectors.toList());
    }



}

