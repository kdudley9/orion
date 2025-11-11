package com.github.kdudley9.orion.dtos;

import java.time.LocalDate;

import com.github.kdudley9.orion.enums.InterviewType;
import com.github.kdudley9.orion.models.ApplicationDetails;

public record UpcomingInterviewDto(
    LocalDate interviewDate,
    String location,
    String meetingLink,
    InterviewType interviewType,
    String company,
    String jobTitle
) {}