package com.github.kdudley9.orion.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.github.kdudley9.orion.dtos.GeneratedQuestionDto;
import com.github.kdudley9.orion.dtos.InterviewQuestionDto;
import com.github.kdudley9.orion.models.InterviewQuestion;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InterviewQuestionMapper {
    InterviewQuestionDto toDto(InterviewQuestion interviewQuestion);

    InterviewQuestionDto toDto(GeneratedQuestionDto generatedQuestionDto);

    InterviewQuestion toEntity(InterviewQuestionDto interviewQuestionDto);

    InterviewQuestion toEntity(GeneratedQuestionDto generatedQuestionDto);
}
