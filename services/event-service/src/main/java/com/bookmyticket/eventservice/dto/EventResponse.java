package com.bookmyticket.eventservice.dto;

import com.bookmyticket.eventservice.entity.EventCategory;
import com.bookmyticket.eventservice.entity.EventStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

public record EventResponse(
        UUID id,
        String title,
        String description,
        VenueResponse venue,
        LocalDateTime eventDate,
        EventCategory category,
        EventStatus status,
        UUID organizerId,
        Integer totalSeats,
        BigDecimal ticketPrice,
        Instant createdAt
) {
}
