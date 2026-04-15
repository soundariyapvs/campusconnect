package com.campusconnect.CampusConnect.repositories;

import com.campusconnect.CampusConnect.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
