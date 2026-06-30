package com.bookmyticket.inventoryservice.dto;

import java.util.UUID;

public record SeatAvailabilityResponse(
        UUID eventId,
        long totalSeats,
        long availableSeats,
        long lockedSeats,
        long bookedSeats
) {
}
