package com.bookmyticket.eventservice.repository;

import com.bookmyticket.eventservice.entity.Event;
import com.bookmyticket.eventservice.entity.EventCategory;
import com.bookmyticket.eventservice.entity.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findByStatus(EventStatus status);
    List<Event> findByCategory(EventCategory category);
}
