package com.bookmyticket.inventoryservice.service;

import com.bookmyticket.inventoryservice.dto.CreateSeatsRequest;
import com.bookmyticket.inventoryservice.dto.SeatAvailabilityResponse;
import com.bookmyticket.inventoryservice.dto.SeatResponse;
import com.bookmyticket.inventoryservice.entity.Seat;
import com.bookmyticket.inventoryservice.entity.SeatStatus;
import com.bookmyticket.inventoryservice.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService {

    private final SeatRepository seatRepository;

    public List<SeatResponse> initializeSeats(CreateSeatsRequest request) {
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= request.numberOfSeats(); i++) {
            Seat seat = Seat.builder()
                    .eventId(request.eventId())
                    .seatNumber(request.seatPrefix() + i)
                    .section(request.section())
                    .price(request.price())
                    .status(SeatStatus.AVAILABLE)
                    .build();
            seats.add(seat);
        }
        
        List<Seat> savedSeats = seatRepository.saveAll(seats);
        return savedSeats.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SeatResponse> getSeatsByEvent(UUID eventId) {
        return seatRepository.findByEventId(eventId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SeatAvailabilityResponse getAvailability(UUID eventId) {
        long available = seatRepository.countByEventIdAndStatus(eventId, SeatStatus.AVAILABLE);
        long locked = seatRepository.countByEventIdAndStatus(eventId, SeatStatus.LOCKED);
        long booked = seatRepository.countByEventIdAndStatus(eventId, SeatStatus.BOOKED);
        long total = available + locked + booked;

        return new SeatAvailabilityResponse(eventId, total, available, locked, booked);
    }

    @Transactional(readOnly = true)
    public List<SeatResponse> getAvailableSeats(UUID eventId) {
        return seatRepository.findByEventIdAndStatus(eventId, SeatStatus.AVAILABLE).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private SeatResponse mapToResponse(Seat seat) {
        return new SeatResponse(
                seat.getId(),
                seat.getEventId(),
                seat.getSeatNumber(),
                seat.getSection(),
                seat.getPrice(),
                seat.getStatus()
        );
    }
}
