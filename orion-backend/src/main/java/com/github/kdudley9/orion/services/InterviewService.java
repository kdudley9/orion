package com.github.kdudley9.orion.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kdudley9.orion.dtos.InterviewDto;
import com.github.kdudley9.orion.mappers.InterviewMapper;
import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.Interview;
import com.github.kdudley9.orion.repositories.ApplicationDetailsRepository;
import com.github.kdudley9.orion.repositories.InterviewRepository;
import com.github.kdudley9.orion.security.UserFacade;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class InterviewService {
    private final InterviewRepository interviewRepository;
    private final ApplicationDetailsRepository applicationDetailsRepository;
    private final InterviewMapper interviewMapper;
    private final UserFacade userFacade;

    public InterviewService(InterviewRepository interviewRepository, InterviewMapper interviewMapper, UserFacade userFacade, ApplicationDetailsRepository applicationDetailsRepository) {
        this.interviewRepository = interviewRepository;
        this.applicationDetailsRepository = applicationDetailsRepository;
        this.interviewMapper = interviewMapper;
        this.userFacade = userFacade;
    }

    public InterviewDto addInterview(InterviewDto interviewDto, Long applicationId) {
        Interview interview = this.interviewMapper.toEntity(interviewDto);

        ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(applicationId).orElse(null);

        if (!applicationDetails.getUser().getId().equals(userFacade.getCurrentUserId())) {
            throw new RuntimeException("Resource not found.");
        }

        interview.setApplicationDetails(applicationDetails);
        this.interviewRepository.save(interview);
        return this.interviewMapper.toDto(interview);
    }

    public InterviewDto updateInterview(InterviewDto interviewDto, Long applicationId, Long interviewId) {
        ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(applicationId).orElse(null);

        if (!applicationDetails.getUser().getId().equals(userFacade.getCurrentUserId())) {
            throw new RuntimeException("Resource not found.");
        }

        Interview interviewToUpdate = this.interviewRepository.findById(interviewId).orElse(null);
        interviewToUpdate.setInterviewDate(interviewDto.interviewDate());
        interviewToUpdate.setInterviewType(interviewDto.interviewType());
        interviewToUpdate.setLocation(interviewDto.location());
        interviewToUpdate.setMeetingLink(interviewDto.meetingLink());
        interviewToUpdate.setInterviewers(interviewDto.interviewers());

        this.interviewRepository.save(interviewToUpdate);
        return this.interviewMapper.toDto(interviewToUpdate);
    }

    public List<InterviewDto> getAllInterviews(Long applicationId) {
        ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(applicationId).orElse(null);

        if (!applicationDetails.getUser().getId().equals(userFacade.getCurrentUserId())) {
            throw new RuntimeException("Resource not found.");
        }

        List<InterviewDto> allInterviews = this.interviewRepository
            .findByApplicationDetails(applicationDetails).stream().map(this.interviewMapper::toDto).toList();
        return allInterviews;
    }

    public int deleteInterview(Long applicationId, Long interviewId) {
        ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(applicationId).orElse(null);

        if (!applicationDetails.getUser().getId().equals(userFacade.getCurrentUserId())) {
            throw new RuntimeException("Resource not found.");
        }

        return this.interviewRepository.deleteByIdAndApplicationDetailsId(applicationId, interviewId);
    }
}
