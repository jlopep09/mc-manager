package com.joselp.practJava.repository;

import com.joselp.practJava.entity.UserHeroe;
import org.springframework.data.repository.CrudRepository;

public interface UserHeroeRepository extends CrudRepository<UserHeroe, Integer> {
}
