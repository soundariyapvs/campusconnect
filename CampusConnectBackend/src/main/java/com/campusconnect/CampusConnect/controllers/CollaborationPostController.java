package com.campusconnect.CampusConnect.controllers;

import com.campusconnect.CampusConnect.models.CollaborationPost;
import com.campusconnect.CampusConnect.services.CollaborationPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collaborations")
@CrossOrigin(origins = "*")
public class CollaborationPostController {

    @Autowired
    private CollaborationPostService collaborationPostService;

    @PostMapping
    public ResponseEntity<CollaborationPost> createPost(@RequestBody CollaborationPost post) {
        return ResponseEntity.ok(collaborationPostService.createPost(post));
    }

    @GetMapping
    public ResponseEntity<List<CollaborationPost>> getAllPosts() {
        return ResponseEntity.ok(collaborationPostService.getAllPosts());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        collaborationPostService.deletePost(id);
        return ResponseEntity.ok().build();
    }
}
