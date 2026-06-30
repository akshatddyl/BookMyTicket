package com.bookmyticket.inventoryservice.dto;

import com.bookmyticket.inventoryservice.entity.SeatStatus;

import java.math.BigDecimal;
import java.util.UUID;

public record SeatResponse(
        UUID id,
        UUID eventId,
        String seatNumber,
        String section,
        BigDecimal price,
        SeatStatus status
) {
}
