package com.joselp.practJava.controllers;

import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;

@RestController
@RequestMapping("/v1/manager")
public class ManagerController {

    @GetMapping("/status")
    public String getServiceStatus(){
    RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth("1b94e573bf367248a6de3b3bedafc291951c74b33550c8dbf09a6c9582afbe5a");
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                "http://minecraft-manager:8080/v1/status",
                HttpMethod.GET,
                request,
                String.class
        );

        String result = response.getBody();
        return result;
    }

}
