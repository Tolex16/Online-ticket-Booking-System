package com.example.system.Mappers.Impl.PassengerMapper;

import com.example.system.Dto.OperatorDto;
import com.example.system.Entity.Operators;
import com.example.system.Mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class OperatorListMapperImpl implements Mapper<Operators, OperatorDto> {

    private final ModelMapper modelMapper;

 @Override
    public OperatorDto mapTo(Operators operator) {
        OperatorDto operatorDto = new OperatorDto();

        operatorDto.setDriverName(operator.getDriverName());
        operatorDto.setBusModel(operator.getBusModel());
        operatorDto.setBusNumber(operator.getBusNumber());
        operatorDto.setSeating(operator.getSeating());
        operatorDto.setPhoneNumber(operator.getPhoneNumber());
        operatorDto.setOrigin(operator.getRoute().getOrigin());
        operatorDto.setDestination(operator.getRoute().getDestination());

		return operatorDto;
    }

    @Override
    public Operators mapFrom(OperatorDto operatorDto) {
        return modelMapper.map(operatorDto, Operators.class);
    }

    @Override
    public List<OperatorDto> mapListTo(Iterable<Operators> operatorsIterable) {
        return StreamSupport.stream(operatorsIterable.spliterator(), false)
                .map(operators -> modelMapper.map(
                        operators, OperatorDto.class
                )).collect(Collectors.toList());
    }


}

