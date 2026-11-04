-- Tabla de roles
CREATE TABLE IF NOT EXISTS `role` (
                                     `id` INT NOT NULL AUTO_INCREMENT,
                                     `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS `users` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `email` VARCHAR(300) NOT NULL,
    `external_id` VARCHAR(300) DEFAULT NULL,
    `username` VARCHAR(300) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `last_login` DATETIME
    ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_email` (`email`),
    UNIQUE KEY `uk_user_external_id` (`external_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla intermedia de usuarios y roles
CREATE TABLE IF NOT EXISTS `user_role` (
       `id` INT NOT NULL AUTO_INCREMENT,
       `user_id` INT NOT NULL,
       `role_id` INT NOT NULL,
       PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_role` (`user_id`, `role_id`),
    KEY `idx_user_role_rol_id` (`role_id`),
    CONSTRAINT `fk_user_role_user`
    FOREIGN KEY (`user_id`)
    REFERENCES users (`id`)
    ON DELETE CASCADE,
    CONSTRAINT `fk_user_role_rol`
    FOREIGN KEY (`role_id`)
    REFERENCES role (`id`)
    ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
