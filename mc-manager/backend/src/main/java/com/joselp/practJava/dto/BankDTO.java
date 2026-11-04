package com.joselp.practJava.dto;

import com.joselp.practJava.entity.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

public class BankDTO {

    private Integer coins;

    public BankDTO(Integer coins) {
        this.coins = coins;
    }

    public Integer getCoins() {
        return coins;
    }
}
