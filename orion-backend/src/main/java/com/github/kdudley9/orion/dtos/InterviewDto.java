package com.github.kdudley9.orion.dtos;

import java.time.LocalDate;
import java.util.Set;

import com.github.kdudley9.orion.enums.InterviewType;
import com.github.kdudley9.orion.models.Interviewer;

public record InterviewDto(
    Long id,
    LocalDate interviewDate,
    String location,
    String meetingLink,
    InterviewType interviewType,
    Set<Interviewer> interviewers
) {}
