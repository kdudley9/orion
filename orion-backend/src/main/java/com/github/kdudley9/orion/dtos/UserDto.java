package com.github.kdudley9.orion.dtos;

import com.github.kdudley9.orion.enums.AuthProvider;

public record UserDto(
    String name,
    String email,
    String imageUrl,
    AuthProvider provider
) {}
