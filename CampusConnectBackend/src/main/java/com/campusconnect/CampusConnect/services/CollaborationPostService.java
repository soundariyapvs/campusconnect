package com.campusconnect.CampusConnect.services;

import com.campusconnect.CampusConnect.models.CollaborationPost;
import com.campusconnect.CampusConnect.repositories.CollaborationPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollaborationPostService {

    @Autowired
    private CollaborationPostRepository collaborationPostRepository;

    public CollaborationPost createPost(CollaborationPost post) {
        return collaborationPostRepository.save(post);
    }

    public List<CollaborationPost> getAllPosts() {
        return collaborationPostRepository.findAll();
    }

    public void deletePost(Long id) {
        collaborationPostRepository.deleteById(id);
    }
}
