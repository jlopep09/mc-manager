package com.joselp.practJava.controllers;

import com.joselp.practJava.entity.User;
import com.joselp.practJava.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@RestController
@RequestMapping("/v1/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }


    @GetMapping
    public ResponseEntity<Optional<User>> getUserByEmail(@RequestParam String userEmail){
        Optional<User> user = repository.findByEmail(userEmail);
        return ResponseEntity.status(HttpStatus.FOUND).body(user);
    }


    @PostMapping("/sync")
    public ResponseEntity<User> syncUser(
            @RequestParam String email,
            @RequestParam String username,
            @AuthenticationPrincipal Jwt jwt) {
        String externalId = jwt.getClaimAsString("sub");
        Optional<User> existingUser =
                repository.findByExternalId(externalId);

        if (existingUser.isPresent()) {
            existingUser.get().setLastLogin(LocalDateTime.now().toInstant(ZoneOffset.ofHours(0)));
            repository.save(existingUser.get());
            return ResponseEntity.ok(existingUser.get());
        }

        User newUser = new User();
        newUser.setExternalId(externalId);
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setCreatedAt(LocalDateTime.now().toInstant(ZoneOffset.ofHours(0)));
        newUser.setUpdatedAt(LocalDateTime.now().toInstant(ZoneOffset.ofHours(0)));
        newUser.setLastLogin(LocalDateTime.now().toInstant(ZoneOffset.ofHours(0)));
        User savedUser = repository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
