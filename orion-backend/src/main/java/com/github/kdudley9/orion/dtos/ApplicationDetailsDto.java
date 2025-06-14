package com.github.kdudley9.orion.dtos;

import java.time.LocalDate;

import org.hibernate.validator.constraints.URL;

import com.github.kdudley9.orion.enums.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ApplicationDetailsDto(
        Long id,
        @NotBlank String company, 
        @NotBlank String jobTitle, 
        @NotNull String location, 
        @NotBlank @Size(max = 2048) @URL String url, 
        @Size(max = 2000) String note, 
        @NotNull LocalDate dateApplied, 
        @NotNull String industry, 
        @NotNull Status status
) {}
