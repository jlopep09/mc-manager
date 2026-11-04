package com.joselp.practJava.configuration;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

/**
 * Maps the database password injected by Docker Compose to the property used by
 * the application.
 */
public class DockerSecretsProcessor implements EnvironmentPostProcessor {

	private static final String MYSQL_PASSWORD = "MYSQL_PASSWORD";
	private static final String MYSQL_ROOT_PASSWORD = "MYSQL_ROOT_PASSWORD";

	@Override
	public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
		if (environment.getProperty(MYSQL_PASSWORD) == null) {
			String rootPassword = environment.getProperty(MYSQL_ROOT_PASSWORD);
			if (rootPassword != null && !rootPassword.isEmpty()) {
				environment.getPropertySources().addFirst(new MapPropertySource(
						"docker-compose-database-password",
						Collections.singletonMap(MYSQL_PASSWORD, rootPassword)));
			}
		}
	}
}
