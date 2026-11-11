package com.joselp.practJava.repository;

import com.joselp.practJava.entity.UserRole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends CrudRepository<UserRole, Integer> {
    Optional<UserRole> findByUser_IdAndRole_Name(Integer userId,String roleName);
    Optional<UserRole> findByUser_ExternalIdAndRole_Name(String externalId,String roleName);
}
