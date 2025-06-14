package com.github.kdudley9.orion.dtos;

import com.github.kdudley9.orion.enums.AuthProvider;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record UserDto(
    String name,
    String email,
    String imageUrl,
    @Enumerated(EnumType.STRING) AuthProvider provider
) {}
