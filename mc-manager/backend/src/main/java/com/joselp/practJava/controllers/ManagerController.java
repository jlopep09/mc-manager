package com.joselp.practJava.controllers;

import com.joselp.practJava.configuration.MinecraftManagerProperties;
import com.joselp.practJava.dto.ServiceOnOffDTO;
import com.joselp.practJava.dto.ServiceStatusDTO;

import com.joselp.practJava.entity.UserRole;
import com.joselp.practJava.repository.UserRoleRepository;
import com.nimbusds.jwt.JWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;



@RestController
@RequestMapping("/v1/manager")
public class ManagerController {

    private final UserRoleRepository userRoleRepository;
    private final MinecraftManagerProperties managerProperties;

    public ManagerController(
            UserRoleRepository userRoleRepository,
            MinecraftManagerProperties managerProperties
    ) {
        this.userRoleRepository = userRoleRepository;
        this.managerProperties = managerProperties;
    }

    @PostMapping("/off")
    public ResponseEntity<ServiceOnOffDTO> changeStatusService_off(@AuthenticationPrincipal Jwt jwt) {
        ServiceOnOffDTO result = new ServiceOnOffDTO();

        if(jwt == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

        String external_id = jwt.getClaimAsString("sub");
        Optional<UserRole> userRole =  userRoleRepository.findByUser_ExternalIdAndRole_Name(external_id, "admin");

        if(!userRole.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }


        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(managerProperties.getApiKey());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                (managerProperties.getUrl() + "/v1/stop"),
                HttpMethod.POST,
                request,
                String.class
        );
        String serviceMapData = response.getBody();

        if (serviceMapData == null) {
            result.setSuccess(false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
        result.setSuccess(true);
        result.setIs_online(false);
        return ResponseEntity.status(response.getStatusCode())
                .body(result);
    }

    @PostMapping("/on")
    public ResponseEntity<ServiceOnOffDTO> changeStatusService_on(@AuthenticationPrincipal Jwt jwt) {

        ServiceOnOffDTO result = new ServiceOnOffDTO();

        if(jwt == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

        String external_id = jwt.getClaimAsString("sub");
        Optional<UserRole> userRole =  userRoleRepository.findByUser_ExternalIdAndRole_Name(external_id, "admin");

        if(!userRole.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }


        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(managerProperties.getApiKey());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                (managerProperties.getUrl() + "/v1/start"),
                HttpMethod.POST,
                request,
                String.class
        );
        String serviceMapData = response.getBody();

        if (serviceMapData == null) {
            result.setSuccess(false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
        result.setSuccess(true);
        result.setIs_online(true);
        return ResponseEntity.status(response.getStatusCode())
                .body(result);
    }


    @GetMapping("/status")
    public ResponseEntity<ServiceStatusDTO> getServiceStatus(@AuthenticationPrincipal Jwt jwt) {
        ServiceStatusDTO result = new ServiceStatusDTO();
        if(jwt == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

        String external_id = jwt.getClaimAsString("sub");
        Optional<UserRole> userRole =  userRoleRepository.findByUser_ExternalIdAndRole_Name(external_id, "admin");

        if(!userRole.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(managerProperties.getApiKey());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                (managerProperties.getUrl() + "/v1/status"),
                HttpMethod.GET,
                request,
                Map.class
        );
        Map<String, Object> serviceMapData = response.getBody();

        if (serviceMapData == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }

        List<Map<String, Object>> containers =
                (List<Map<String, Object>>) serviceMapData.get("containers");

        if (containers != null && !containers.isEmpty()) {

            Map<String, Object> container = containers.get(0);

            result.setSuccess(serviceMapData.get("success").toString().equalsIgnoreCase("true"));
            result.setName((String) container.get("name"));
            result.setCreatedAt((String) container.get("created"));
            result.setStatus((String) container.get("status"));
        }

        return ResponseEntity.status(response.getStatusCode())
                .body(result);
    }

}
