package com.example.USLTEST.domain.mapper.impl;

import com.example.USLTEST.domain.DTO.BusDto;
import com.example.USLTEST.domain.entity.BusEntity;
import com.example.USLTEST.domain.mapper.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class BusMapperImpl implements Mapper<BusEntity, BusDto> {

    private final ModelMapper modelMapper;

    @Override
    public BusDto mapTo(BusEntity busEntity) {

        BusDto busDto = new BusDto();

        busDto.setOrigin(busEntity.getRoute().getOrigin());
        busDto.setDestination(busEntity.getRoute().getDestination());
        busDto.setDepartureDate(busEntity.getRoute().getDepartureDate());
        busDto.setDepartureTime(busEntity.getRoute().getDepartureTime());
        busDto.setDriverName(busEntity.getDriverName());
        busDto.setBusModel(busEntity.getBusModel());
        busDto.setPhoneNumber(busEntity.getPhoneNumber());
        busDto.setCapacity(busEntity.getCapacity());
        busDto.setBusNumber(busEntity.getBusNumber());

        return busDto;
    }

    @Override
    public BusEntity mapFrom(BusDto busDto) {
        return modelMapper.map(busDto, BusEntity.class);
    }

    @Override
    public Iterable<BusDto> mapListTo(Iterable<BusEntity> busEntities) {
        return StreamSupport.stream(busEntities.spliterator(), false)
                .map(busEntity -> modelMapper.map(busEntity, BusDto.class))
                .collect(Collectors.toList());
    }
}
