package com.joselp.practJava.dto;

public class ServiceOnOffDTO {
    private boolean success;
    private boolean is_online;

    public ServiceOnOffDTO() {
    }

    public ServiceOnOffDTO(boolean success, boolean is_online) {
        this.success = success;
        this.is_online = is_online;
    }


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isIs_online() {
        return is_online;
    }

    public void setIs_online(boolean is_online) {
        this.is_online = is_online;
    }
}
