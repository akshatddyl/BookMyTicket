package com.bookmyticket.eventservice.controller;

import com.bookmyticket.eventservice.dto.CreateEventRequest;
import com.bookmyticket.eventservice.dto.EventResponse;
import com.bookmyticket.eventservice.service.EventService;
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
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseWrapper<EventResponse> createEvent(@Valid @RequestBody CreateEventRequest request) {
        EventResponse response = eventService.createEvent(request);
        return ResponseWrapper.success("Event created successfully", response);
    }

    @GetMapping
    public ResponseWrapper<List<EventResponse>> getAllEvents() {
        return ResponseWrapper.success("Events retrieved successfully", eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseWrapper<EventResponse> getEventById(@PathVariable UUID id) {
        return ResponseWrapper.success("Event retrieved successfully", eventService.getEventById(id));
    }
}
