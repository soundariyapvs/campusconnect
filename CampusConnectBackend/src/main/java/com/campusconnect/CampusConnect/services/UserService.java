package com.campusconnect.CampusConnect.services;

import com.campusconnect.CampusConnect.config.JwtUtil;
import com.campusconnect.CampusConnect.models.User;
import com.campusconnect.CampusConnect.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRole() == null) {
            user.setRole("USER");
        }
        return userRepository.save(user);
    }

    public String loginUser(String email, String password) {
        Optional<User> optUser = userRepository.findByEmail(email);
        if (optUser.isPresent() && passwordEncoder.matches(password, optUser.get().getPassword())) {
             return jwtUtil.generateToken(email);
        }
        throw new RuntimeException("Invalid username or password");
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
