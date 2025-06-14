package com.github.kdudley9.orion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class OrionApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrionApplication.class, args);
	}

}
