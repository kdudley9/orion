package com.github.kdudley9.orion.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kdudley9.orion.dtos.InterviewDto;
import com.github.kdudley9.orion.dtos.UpcomingInterviewDto;
import com.github.kdudley9.orion.services.InterviewService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/application-details")
public class InterviewController {
    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @GetMapping("/{applicationId}/interviews")
    public ResponseEntity<List<InterviewDto>> getInterviews(@PathVariable Long applicationId) {
        if (applicationId == null) {
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(this.interviewService.getAllInterviews(applicationId), HttpStatus.OK);
    }
    
    @PostMapping("/{applicationId}/interviews")
    public ResponseEntity<InterviewDto> addInterview(@RequestBody InterviewDto interviewDto, @PathVariable("applicationId") Long applicationid) {        
        return new ResponseEntity<>(this.interviewService.addInterview(interviewDto, applicationid), HttpStatus.CREATED);
    }
    
    @PutMapping("/{applicationId}/interviews/{interviewId}")
    public ResponseEntity<InterviewDto> updateInterview(@RequestBody InterviewDto interviewDto, @PathVariable Long applicationId, @PathVariable Long interviewId) {
        return new ResponseEntity<>(this.interviewService.updateInterview(interviewDto, applicationId, interviewId), HttpStatus.OK);
    }

    @DeleteMapping("/{applicationId}/interviews/{interviewId}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long applicationId, @PathVariable Long interviewId) {
        int applicationsDeleted = this.interviewService.deleteInterview(interviewId, applicationId);
        if (applicationsDeleted == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/upcoming-interview")
    public ResponseEntity<UpcomingInterviewDto> getUpcomingInterview() {
        return new ResponseEntity<>(this.interviewService.getUpcomingInterview(), HttpStatus.OK);
    }
}