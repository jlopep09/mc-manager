package com.joselp.practJava.repository;

import com.joselp.practJava.entity.Hero;
import org.springframework.data.repository.CrudRepository;

public interface HeroesRepository extends CrudRepository<Hero, Integer> {

}
