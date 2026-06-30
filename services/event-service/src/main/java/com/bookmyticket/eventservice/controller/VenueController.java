package com.bookmyticket.eventservice.controller;

import com.bookmyticket.eventservice.dto.CreateVenueRequest;
import com.bookmyticket.eventservice.dto.VenueResponse;
import com.bookmyticket.eventservice.service.VenueService;
import com.bookmyticket.shared.dto.ResponseWrapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events/venues")
@RequiredArgsConstructor
public class VenueController {

    private final VenueService venueService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseWrapper<VenueResponse> createVenue(@Valid @RequestBody CreateVenueRequest request) {
        VenueResponse response = venueService.createVenue(request);
        return ResponseWrapper.success("Venue created successfully", response);
    }

    @GetMapping
    public ResponseWrapper<List<VenueResponse>> getAllVenues() {
        return ResponseWrapper.success("Venues retrieved successfully", venueService.getAllVenues());
    }

    @GetMapping("/{id}")
    public ResponseWrapper<VenueResponse> getVenueById(@PathVariable UUID id) {
        return ResponseWrapper.success("Venue retrieved successfully", venueService.getVenueById(id));
    }
}
