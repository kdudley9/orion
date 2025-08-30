package com.github.kdudley9.orion.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kdudley9.orion.dtos.InterviewQuestionDto;
import com.github.kdudley9.orion.mappers.InterviewQuestionMapper;
import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.InterviewQuestion;
import com.github.kdudley9.orion.repositories.ApplicationDetailsRepository;
import com.github.kdudley9.orion.repositories.InterviewQuestionRepository;
import com.github.kdudley9.orion.repositories.InterviewRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class InterviewQuestionService {

    private final InterviewRepository interviewRepository;
    private final InterviewQuestionRepository interviewQuestionRepository;
    private final InterviewQuestionMapper interviewQuestionMapper;
    private final ApplicationDetailsService applicationDetailsService;
    private final ApplicationDetailsRepository applicationDetailsRepository;

    public InterviewQuestionService(InterviewQuestionRepository interviewQuestionRepository, InterviewQuestionMapper interviewQuestionMapper, ApplicationDetailsService applicationDetailsService, ApplicationDetailsRepository applicationDetailsRepository, InterviewRepository interviewRepository) {
        this.interviewQuestionRepository = interviewQuestionRepository;
        this.interviewQuestionMapper = interviewQuestionMapper;
        this.applicationDetailsService = applicationDetailsService;
        this.applicationDetailsRepository = applicationDetailsRepository;
        this.interviewRepository = interviewRepository;
    }

    public InterviewQuestionDto addInterviewQuestion(InterviewQuestionDto interviewQuestionDto, Long applicationId) {
        InterviewQuestion interviewQuestion = this.interviewQuestionMapper.toEntity(interviewQuestionDto);
        ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(applicationId).orElse(null);
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }

        interviewQuestion.setApplicationDetails(applicationDetails);
        this.interviewQuestionRepository.save(interviewQuestion);
        return this.interviewQuestionMapper.toDto(interviewQuestion);
    }

    public InterviewQuestionDto updateInterviewQuestion(InterviewQuestionDto interviewQuestionDto, Long applicationId, Long interviewId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }

        InterviewQuestion interviewQuestionToUpdate = this.interviewQuestionRepository.findById(interviewId)
            .orElseThrow(EntityNotFoundException::new);
        
        interviewQuestionToUpdate.setQuestion(interviewQuestionDto.question());
        interviewQuestionToUpdate.setNote(interviewQuestionDto.note());
        this.interviewQuestionRepository.save(interviewQuestionToUpdate);
        return this.interviewQuestionMapper.toDto(interviewQuestionToUpdate);
    }

    public InterviewQuestionDto getInterviewQuestion(Long applicationId, Long interviewQuestionId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }

        InterviewQuestion interviewQuestion = this.interviewQuestionRepository.findById(interviewQuestionId)
            .orElseThrow(EntityNotFoundException::new);
        return this.interviewQuestionMapper.toDto(interviewQuestion);
    }

    public List<InterviewQuestionDto> getAllInterviewQuestions(Long applicationId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }

        // ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(applicationId)
        //     .orElseThrow(EntityNotFoundException::new);
        List<InterviewQuestionDto> interviewQuestionDtos = this.interviewQuestionRepository
            .findByApplicationDetailsId(applicationId).stream().map(this.interviewQuestionMapper::toDto).toList();
        return interviewQuestionDtos;
    }

    public int deleteAllInterviewQuestions(Long applicationId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }
        return this.interviewRepository.deleteByApplicationDetailsId(applicationId);
    }

    public int deleteInterviewQuestion(Long interviewId, Long applicationId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }
        return this.interviewRepository.deleteByIdAndApplicationDetailsId(interviewId, applicationId);
    }
}
