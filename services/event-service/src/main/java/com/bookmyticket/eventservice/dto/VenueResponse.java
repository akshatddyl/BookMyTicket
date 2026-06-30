package com.bookmyticket.eventservice.dto;

import java.util.UUID;

public record VenueResponse(
        UUID id,
        String name,
        String address,
        String city,
        String state,
        Integer capacity
) {
}
