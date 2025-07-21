package com.github.kdudley9.orion.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.github.kdudley9.orion.dtos.ApplicationDetailsDto;
import com.github.kdudley9.orion.models.ApplicationDetails;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ApplicationDetailsMapper {
    ApplicationDetailsDto toDto(ApplicationDetails applicationDetails);

    ApplicationDetails toEntity(ApplicationDetailsDto applicationDetailsDto);
}
