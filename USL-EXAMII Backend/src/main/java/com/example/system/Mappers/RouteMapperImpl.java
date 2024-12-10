package com.example.system.Mappers;

import com.example.system.Dto.RouteDto;
import com.example.system.Entity.Routes;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class RouteMapperImpl implements Mapper<Routes, RouteDto> {

    private final ModelMapper modelMapper;

    @Override
    public RouteDto mapTo(Routes routeEntity) {
        return modelMapper.map(routeEntity, RouteDto.class);
    }

    @Override
    public Routes mapFrom(RouteDto routeDto) {
        return modelMapper.map(routeDto, Routes.class);
    }

    @Override
    public Iterable<RouteDto> mapListTo(Iterable<Routes> routeEntities) {
        return StreamSupport.stream(routeEntities.spliterator(), false)
                .map(routeEntity -> modelMapper.map(routeEntity, RouteDto.class))
                .collect(Collectors.toList());
    }
}
