package com.joselp.practJava.repository;

import com.joselp.practJava.entity.Bank;
import com.joselp.practJava.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface BanksRepository extends CrudRepository<Bank, Integer> {
    Optional<Bank> findByUser_Id(Integer userId);
}
