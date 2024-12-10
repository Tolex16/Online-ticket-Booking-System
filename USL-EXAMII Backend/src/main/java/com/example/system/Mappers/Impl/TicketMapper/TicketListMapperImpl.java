package com.example.system.Mappers.Impl.TicketMapper;

import com.example.system.Dto.TicketDto;
import com.example.system.Entity.Tickets;
import com.example.system.Mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class TicketListMapperImpl implements Mapper<Tickets, TicketDto> {

    private final ModelMapper modelMapper;

    @Override
    public TicketDto mapTo(Tickets tickets) {
        TicketDto ticketDto = new TicketDto();
        ticketDto.setTicketNo(tickets.getTicketId());
        ticketDto.setPassengerName(tickets.getPassenger().getFirstName() + " " + tickets.getPassenger().getLastName());
        ticketDto.setSeatNumber(tickets.getSeatNumber());
        ticketDto.setEstimatedDuration(tickets.getRoute().getDuration());
        ticketDto.setPrice(tickets.getPrice());
        ticketDto.setOrigin(tickets.getRoute().getOrigin());
        ticketDto.setDestination(tickets.getRoute().getDestination());
        ticketDto.setBookingDateTime(tickets.getBookingDateTIME());
        ticketDto.setBusNumber(tickets.getOperator().getBusNumber());
        ticketDto.setDriverName(tickets.getOperator().getDriverName());

        return ticketDto;
    }

    @Override
    public Tickets mapFrom(TicketDto ticketDto) {
        return modelMapper.map(ticketDto, Tickets.class);
    }

    @Override
    public List<TicketDto> mapListTo(Iterable<Tickets> ticketsIterable) {
        return StreamSupport.stream(ticketsIterable.spliterator(), false)
                .map(this::mapTo)
                .collect(Collectors.toList());
    }


}

