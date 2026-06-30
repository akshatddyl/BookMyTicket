package com.bookmyticket.eventservice.repository;

import com.bookmyticket.eventservice.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VenueRepository extends JpaRepository<Venue, UUID> {
}
