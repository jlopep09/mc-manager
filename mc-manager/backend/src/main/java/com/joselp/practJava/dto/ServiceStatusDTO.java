package com.joselp.practJava.dto;

public class ServiceStatusDTO {

    private boolean success;
    private String name;
    private String createdAt;
    private String status;

    public ServiceStatusDTO() {

    }
    public ServiceStatusDTO(boolean success, String name, String createdAt, String status) {
        this.success = success;
        this.name = name;
        this.createdAt = createdAt;
        this.status = status;
    }


    public boolean isSuccess() {
        return success;
    }

    public String getName() {
        return name;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
