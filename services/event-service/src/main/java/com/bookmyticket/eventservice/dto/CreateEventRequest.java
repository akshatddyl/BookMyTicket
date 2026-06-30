package com.bookmyticket.eventservice.dto;

import com.bookmyticket.eventservice.entity.EventCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record CreateEventRequest(
        @NotBlank @Size(max = 300) String title,
        String description,
        @NotNull UUID venueId,
        @NotNull @Future LocalDateTime eventDate,
        @NotNull EventCategory category,
        @NotNull UUID organizerId,
        @NotNull @Min(1) Integer totalSeats,
        @NotNull @DecimalMin("0.01") BigDecimal ticketPrice
) {
}
