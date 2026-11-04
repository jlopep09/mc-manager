package com.joselp.practJava.dto;


import com.joselp.practJava.entity.Hero;
import com.joselp.practJava.entity.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

public class UserHeroeDTO {

    private Integer id;
    private Integer user_id;
    private Integer heroe_type;
    private Boolean is_active;

    public UserHeroeDTO(Integer id, Integer user_id, Integer heroe_type, Boolean is_active) {
        this.id = id;
        this.user_id = user_id;
        this.heroe_type = heroe_type;
        this.is_active = is_active;
    }

    public Integer getId() {
        return id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public Integer getHeroe_type() {
        return heroe_type;
    }

    public Boolean getIs_active() {
        return is_active;
    }
}