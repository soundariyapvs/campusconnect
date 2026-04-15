package com.campusconnect.CampusConnect.repositories;

import com.campusconnect.CampusConnect.models.CollaborationPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaborationPostRepository extends JpaRepository<CollaborationPost, Long> {
}
