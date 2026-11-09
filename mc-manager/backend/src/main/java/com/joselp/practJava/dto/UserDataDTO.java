package com.joselp.practJava.dto;

public class UserDataDTO {

    private String email;
    private String username;
    private boolean hasAdminRole;


    public UserDataDTO() {
    }
    public UserDataDTO(String email, String username, boolean hasAdminRole) {
        this.email = email;
        this.username = username;
        this.hasAdminRole = hasAdminRole;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public boolean isHasAdminRole() {
        return hasAdminRole;
    }
}
