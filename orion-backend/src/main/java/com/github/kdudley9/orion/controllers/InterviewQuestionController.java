package com.github.kdudley9.orion.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kdudley9.orion.dtos.InterviewQuestionDto;
import com.github.kdudley9.orion.services.InterviewQuestionService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/application-details/{applicationId}/interview-questions")
public class InterviewQuestionController {
    private final InterviewQuestionService interviewQuestionService;

    public InterviewQuestionController(InterviewQuestionService interviewQuestionService) {
        this.interviewQuestionService = interviewQuestionService;
    }

    @PostMapping
    public ResponseEntity<InterviewQuestionDto> addInterviewQuestion(@RequestBody InterviewQuestionDto interviewQuestionDto, @PathVariable("applicationId") Long applicationId) {
        return new ResponseEntity<>(
            this.interviewQuestionService.addInterviewQuestion(interviewQuestionDto, applicationId), 
            HttpStatus.CREATED
        );
    }

    @GetMapping("/ai-generate-questions")
    public ResponseEntity<List<InterviewQuestionDto>> generateInterviewQuestions(@PathVariable("applicationId") Long applicationId) {
        return new ResponseEntity<>(
            this.interviewQuestionService.generateInterviewQuestions(applicationId), 
            HttpStatus.CREATED
        );
    }
    
    
    @PutMapping("/{interviewQuestionId}")
    public ResponseEntity<InterviewQuestionDto> updateInterviewQuestion(
        @PathVariable Long applicationId, 
        @PathVariable Long interviewQuestionId, 
        @RequestBody InterviewQuestionDto interviewQuestionDto) {
        return new ResponseEntity<>(
            this.interviewQuestionService.updateInterviewQuestion(interviewQuestionDto, applicationId, interviewQuestionId), 
            HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<List<InterviewQuestionDto>> getAllInterviewQuestions(@PathVariable Long applicationId) {
        if (applicationId == null) {
            return ResponseEntity.notFound().build();
        }

        return new ResponseEntity<>(
            this.interviewQuestionService.getAllInterviewQuestions(applicationId), 
            HttpStatus.OK
        );
    }
    
    @GetMapping("/{interviewQuestionId}")
    public ResponseEntity<InterviewQuestionDto> getInterviewQuestion(@PathVariable Long applicationId, @PathVariable Long interviewQuestionId) {
        return new ResponseEntity<>(
            this.interviewQuestionService.getInterviewQuestion(applicationId, interviewQuestionId), 
            HttpStatus.OK
        );
    }
    
    // TODO: Fix because it is not deleting applications
    @DeleteMapping
    public ResponseEntity<Void> deleteAllInterviewQuestions(@PathVariable Long applicationId) {
        int numberDeleted = this.interviewQuestionService.deleteAllInterviewQuestions(applicationId);
        if (numberDeleted == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    // TODO: Fix because it is not deleting applications
    @DeleteMapping("/{interviewQuestionId}")
    public ResponseEntity<Void> deleteInterviewQuestion(@PathVariable Long interviewQuestionId, @PathVariable Long applicationId) {
        int numberDeleted = this.interviewQuestionService.deleteInterviewQuestion(interviewQuestionId, applicationId);
        if (numberDeleted == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
