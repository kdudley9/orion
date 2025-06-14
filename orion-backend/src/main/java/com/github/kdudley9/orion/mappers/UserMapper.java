package com.github.kdudley9.orion.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.github.kdudley9.orion.dtos.UserDto;
import com.github.kdudley9.orion.models.User;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserDto toDto(User user);
}
