package com.bookmyticket.eventservice.service;

import com.bookmyticket.eventservice.dto.CreateEventRequest;
import com.bookmyticket.eventservice.dto.EventResponse;
import com.bookmyticket.eventservice.entity.Event;
import com.bookmyticket.eventservice.entity.EventStatus;
import com.bookmyticket.eventservice.entity.Venue;
import com.bookmyticket.eventservice.repository.EventRepository;
import com.bookmyticket.eventservice.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final VenueRepository venueRepository;
    private final VenueService venueService;

    public EventResponse createEvent(CreateEventRequest request) {
        Venue venue = venueRepository.findById(request.venueId())
                .orElseThrow(() -> new IllegalArgumentException("Venue not found with id: " + request.venueId()));

        Event event = Event.builder()
                .title(request.title())
                .description(request.description())
                .venue(venue)
                .eventDate(request.eventDate())
                .category(request.category())
                .status(EventStatus.DRAFT)
                .organizerId(request.organizerId())
                .totalSeats(request.totalSeats())
                .ticketPrice(request.ticketPrice())
                .build();
        
        event = eventRepository.save(event);
        return mapToResponse(event);
    }

    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public EventResponse getEventById(UUID id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found with id: " + id));
        return mapToResponse(event);
    }

    private EventResponse mapToResponse(Event event) {
        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                venueService.mapToResponse(event.getVenue()),
                event.getEventDate(),
                event.getCategory(),
                event.getStatus(),
                event.getOrganizerId(),
                event.getTotalSeats(),
                event.getTicketPrice(),
                event.getCreatedAt()
        );
    }
}
