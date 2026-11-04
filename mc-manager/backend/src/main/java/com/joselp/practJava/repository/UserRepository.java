package com.joselp.practJava.repository;

import com.joselp.practJava.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findByExternalId(String externalId);
    Optional<User> findByEmail(String email);
}
