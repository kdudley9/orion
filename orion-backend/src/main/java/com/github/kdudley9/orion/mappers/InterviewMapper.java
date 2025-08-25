package com.github.kdudley9.orion.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.github.kdudley9.orion.dtos.InterviewDto;
import com.github.kdudley9.orion.models.Interview;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InterviewMapper {
    InterviewDto toDto(Interview interview);

    Interview toEntity(InterviewDto interviewDto);
}
