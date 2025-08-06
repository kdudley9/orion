package com.github.kdudley9.orion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.jakarta.Hibernate5JakartaModule;

@SpringBootApplication
@EnableWebSecurity
public class OrionApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrionApplication.class, args);
	}

	@Autowired
	void configureObjectMapper(final ObjectMapper mapper) {
		mapper.registerModule(new Hibernate5JakartaModule());
	}
}
