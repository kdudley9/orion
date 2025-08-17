package com.github.kdudley9.orion.configuration;

import com.github.kdudley9.orion.services.GoogleOidcUserService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${auth.success.url}")
    private String authSuccessUrl;
    private final GoogleOidcUserService googleOidcUserService;

    SecurityConfig(GoogleOidcUserService googleOidcUserService) {
        this.googleOidcUserService = googleOidcUserService;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable) // Disabled for development
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers("/", "/index.html", "/assets/**", "/api").permitAll();
                auth.anyRequest().authenticated();
            })
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .oidcUserService(this.googleOidcUserService)
                )
                // Redirect to /api/user-details after successful login
                .defaultSuccessUrl(authSuccessUrl, true)
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            );
        return http.build();
    }
}
