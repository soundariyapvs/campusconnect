package com.campusconnect.CampusConnect.services;

import com.campusconnect.CampusConnect.models.Announcement;
import com.campusconnect.CampusConnect.repositories.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }
}
