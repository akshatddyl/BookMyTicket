package com.bookmyticket.inventoryservice.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateSeatsRequest(
        @NotNull UUID eventId,
        @NotBlank String section,
        @NotNull @DecimalMin("0.01") BigDecimal price,
        @NotNull @Min(1) Integer numberOfSeats,
        @NotBlank String seatPrefix
) {
}
