package com.bookmyticket.eventservice.service;

import com.bookmyticket.eventservice.dto.CreateVenueRequest;
import com.bookmyticket.eventservice.dto.VenueResponse;
import com.bookmyticket.eventservice.entity.Venue;
import com.bookmyticket.eventservice.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VenueService {

    private final VenueRepository venueRepository;

    public VenueResponse createVenue(CreateVenueRequest request) {
        Venue venue = Venue.builder()
                .name(request.name())
                .address(request.address())
                .city(request.city())
                .state(request.state())
                .capacity(request.capacity())
                .build();
        venue = venueRepository.save(venue);
        return mapToResponse(venue);
    }

    public List<VenueResponse> getAllVenues() {
        return venueRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public VenueResponse getVenueById(UUID id) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venue not found with id: " + id));
        return mapToResponse(venue);
    }

    public VenueResponse mapToResponse(Venue venue) {
        return new VenueResponse(
                venue.getId(),
                venue.getName(),
                venue.getAddress(),
                venue.getCity(),
                venue.getState(),
                venue.getCapacity()
        );
    }
}
