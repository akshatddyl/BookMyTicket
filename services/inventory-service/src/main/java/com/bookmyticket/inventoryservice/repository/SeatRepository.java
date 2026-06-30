package com.bookmyticket.inventoryservice.repository;

import com.bookmyticket.inventoryservice.entity.Seat;
import com.bookmyticket.inventoryservice.entity.SeatStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SeatRepository extends JpaRepository<Seat, UUID> {
    List<Seat> findByEventId(UUID eventId);
    List<Seat> findByEventIdAndStatus(UUID eventId, SeatStatus status);
    Optional<Seat> findByEventIdAndSeatNumber(UUID eventId, String seatNumber);
    long countByEventIdAndStatus(UUID eventId, SeatStatus status);
}
