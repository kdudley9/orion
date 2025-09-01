package com.github.kdudley9.orion.dtos;

public record InterviewQuestionDto(
    Long id,
    String question,
    String note,
    boolean isAiGenerated
) {}
