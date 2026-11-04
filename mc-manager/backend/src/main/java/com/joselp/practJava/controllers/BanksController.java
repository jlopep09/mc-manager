package com.joselp.practJava.controllers;


import com.joselp.practJava.dto.BankDTO;
import com.joselp.practJava.entity.Bank;
import com.joselp.practJava.entity.User;
import com.joselp.practJava.repository.BanksRepository;
import com.joselp.practJava.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/bank")
public class BanksController {

    private BanksRepository repository;
    private UserRepository userRepository;
    public BanksController(BanksRepository br, UserRepository ur){
        this.repository = br;
        this.userRepository = ur;
    }

    @GetMapping("/")
    public BankDTO getUserBank(@AuthenticationPrincipal Jwt jwt){
        String external_id = jwt.getClaimAsString("sub");
        Optional<User> user = userRepository.findByExternalId(external_id);
        Optional<Bank> result  ;
        if (user.isPresent()){
            result = repository.findByUser_Id(user.get().getId());
            if (!result.isPresent()){
                Bank bank = new Bank();
                bank.setUser(user.get());
                bank.setCoins(0);
                repository.save(bank);
                return new BankDTO(bank.getCoins());
            }else{
                return new BankDTO(result.get().getCoins());
            }
        }
        return new BankDTO(0);
    }

}
