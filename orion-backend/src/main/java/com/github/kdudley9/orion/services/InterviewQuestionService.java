package com.github.kdudley9.orion.services;

import java.util.List;
import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.github.kdudley9.orion.dtos.GeneratedQuestionDto;
import com.github.kdudley9.orion.dtos.InterviewQuestionDto;
import com.github.kdudley9.orion.mappers.InterviewQuestionMapper;
import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.InterviewQuestion;
import com.github.kdudley9.orion.repositories.ApplicationDetailsRepository;
import com.github.kdudley9.orion.repositories.InterviewQuestionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class InterviewQuestionService {

    private final InterviewQuestionRepository interviewQuestionRepository;
    private final InterviewQuestionMapper interviewQuestionMapper;
    private final ApplicationDetailsService applicationDetailsService;
    private final ApplicationDetailsRepository applicationDetailsRepository;
    private final ChatClient chatClient;

    public InterviewQuestionService(
        InterviewQuestionRepository interviewQuestionRepository, 
        InterviewQuestionMapper interviewQuestionMapper, 
        ApplicationDetailsService applicationDetailsService, 
        ApplicationDetailsRepository applicationDetailsRepository,
        ChatClient.Builder chatClientBuilder
    ) {
        this.interviewQuestionRepository = interviewQuestionRepository;
        this.interviewQuestionMapper = interviewQuestionMapper;
        this.applicationDetailsService = applicationDetailsService;
        this.applicationDetailsRepository = applicationDetailsRepository;
        this.chatClient = chatClientBuilder.build();
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

    public List<InterviewQuestionDto> generateInterviewQuestions(Long applicationId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }

        // Remove previously generated questions
        this.interviewQuestionRepository.deleteGeneratedQuestions(applicationId);

        ApplicationDetails applicationDetails = this.applicationDetailsRepository.findById(applicationId)
            .orElseThrow(EntityNotFoundException::new);

        // The GeneratedQuestionDto will only contains the "question" property. This helps ensure
        // that OpenAi will not attempt to set properties it shouldn't like the entity ids.
        List<GeneratedQuestionDto> generatedQuestions = chatClient.prompt()
            .user(u -> u
                    .text("""
                            Generate fifteen to twenty practice interview questions for a {jobTitle} 
                            role with this job description (if provided): {jobDescription}. If, and 
                            only if, you are familiar with common interview questions asked by 
                            {company}, mix a few of those questions in your output. It should 
                            be possible for each question to be answered with a verbal response, 
                            so no questions that require the interviewee to write out code, 
                            create a UI design mockup, etc. The difficulty of the questions should 
                            be relative to the experience level required, so use the job title and the
                            job description (if provided) to determine how much domain knowledge an
                            average candidate would be expected to know.
                        """)
                    .params(
                        Map.of(
                            "jobTitle", applicationDetails.getJobTitle(),
                            "jobDescription", applicationDetails.getJobDescription(),
                            "company", applicationDetails.getCompany()
                        )
                    )
                )
            .call()
            .entity(new ParameterizedTypeReference<List<GeneratedQuestionDto>>() {});
        
        // Map the generated question DTOs to the InterviewQuestion entity
        List<InterviewQuestion> interviewQuestions = generatedQuestions
            .stream().map(this.interviewQuestionMapper::toEntity).toList();
        
        for (InterviewQuestion interviewQuestion : interviewQuestions) {
            interviewQuestion.setApplicationDetails(applicationDetails);
            interviewQuestion.setAiGenerated(true);
        }

        this.interviewQuestionRepository.saveAll(interviewQuestions);

        // Map the InterviewQuestion entities back to DTOs for the return value
        List<InterviewQuestionDto> interviewQuestionDtos = this.interviewQuestionRepository
            .findByApplicationDetailsId(applicationId).stream().map(this.interviewQuestionMapper::toDto).toList();
        
        return interviewQuestionDtos;
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

        List<InterviewQuestionDto> interviewQuestionDtos = this.interviewQuestionRepository
            .findByApplicationDetailsId(applicationId).stream().map(this.interviewQuestionMapper::toDto).toList();
        return interviewQuestionDtos;
    }

    public int deleteAllInterviewQuestions(Long applicationId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }
        return this.interviewQuestionRepository.deleteByApplicationDetailsId(applicationId);
    }

    public int deleteInterviewQuestion(Long interviewQuestionId, Long applicationId) {
        if (this.applicationDetailsService.applicationBelongsToUser(applicationId) == false) {
            throw new RuntimeException("Application does not belong to user");
        }
        return this.interviewQuestionRepository.deleteByIdAndApplicationDetailsId(interviewQuestionId, applicationId);
    }
}
