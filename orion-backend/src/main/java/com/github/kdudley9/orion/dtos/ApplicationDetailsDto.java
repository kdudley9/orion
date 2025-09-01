package com.github.kdudley9.orion.dtos;

import java.time.LocalDate;

import com.github.kdudley9.orion.enums.Industry;
import com.github.kdudley9.orion.enums.JobType;
import com.github.kdudley9.orion.enums.Status;

public record ApplicationDetailsDto(
    Long id,
    String company, 
    String jobTitle, 
    String location, 
    String url, 
    String jobDescription, 
    LocalDate dateApplied, 
    Industry industry, 
    Status status,
    JobType jobType,
    boolean favorite,
    boolean archived
) {}
