package com.joselp.practJava.controllers;

import com.joselp.practJava.dto.UserDataDTO;
import com.joselp.practJava.entity.User;
import com.joselp.practJava.entity.UserRole;
import com.joselp.practJava.repository.UserRepository;
import com.joselp.practJava.repository.UserRoleRepository;
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
    private final UserRoleRepository userRoleRepository;

    public UserController(UserRepository repository, UserRoleRepository userRoleRepository) {
        this.repository = repository;
        this.userRoleRepository = userRoleRepository;
    }


    @GetMapping("/data")
    public ResponseEntity<UserDataDTO> getUserData(@AuthenticationPrincipal Jwt jwt){
        String externalId = jwt.getClaimAsString("sub");
        UserDataDTO result = new UserDataDTO();
        Optional<User> user = repository.findByExternalId(externalId);
        if (user.isPresent()){
            boolean hasAdminRole;
            Optional<UserRole> userRole = userRoleRepository.findByUser_IdAndRole_Name(user.get().getId(), "admin");
            hasAdminRole = userRole.isPresent();
            result = new UserDataDTO(user.get().getEmail(), user.get().getUsername(), hasAdminRole);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
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
