package com.joselp.practJava.controllers;

import com.joselp.practJava.dto.ServiceStatusDTO;

import com.joselp.practJava.entity.UserRole;
import com.joselp.practJava.repository.UserRoleRepository;
import com.nimbusds.jwt.JWT;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/v1/manager")
public class ManagerController {

    private UserRoleRepository userRoleRepository;
    public ManagerController(UserRoleRepository userRoleRepository){
        this.userRoleRepository = userRoleRepository;
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
        headers.setBearerAuth("1b94e573bf367248a6de3b3bedafc291951c74b33550c8dbf09a6c9582afbe5a");

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "http://minecraft-manager:8080/v1/status",
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
