package com.github.kdudley9.orion.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kdudley9.orion.enums.Industry;
import com.github.kdudley9.orion.enums.InterviewType;
import com.github.kdudley9.orion.enums.JobType;
import com.github.kdudley9.orion.enums.Status;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/dropdown")
public class DropdownController {

    @GetMapping("/industries")
    public ResponseEntity<List<String>> getIndustries() {
        List<String> industries = new ArrayList<>();
        for (Industry industry : Industry.values()) {
            String industryToLower = industry.toString();
            industries.add(industryToLower);
        }
        return new ResponseEntity<>(industries, HttpStatus.OK);
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<String>> getStatuses() {
        List<String> statuses = new ArrayList<>();
        for (Status status : Status.values()) {
            statuses.add(status.toString());
        }
        return new ResponseEntity<>(statuses, HttpStatus.OK);
    }

    @GetMapping("/job-types")
    public ResponseEntity<List<String>> getJobTypes() {
        List<String> jobTypes = new ArrayList<>();
        for (JobType jobType : JobType.values()) {
            jobTypes.add(jobType.toString());
        }
        return new ResponseEntity<>(jobTypes, HttpStatus.OK);
    }

    @GetMapping("/interview-types")
    public ResponseEntity<List<String>> getInterviewTypes(@RequestParam String param) {
        List<String> interviewTypes = new ArrayList<>();
        for (InterviewType interviewType : InterviewType.values()) {
            interviewTypes.add(interviewType.toString());
        }
        return new ResponseEntity<>(interviewTypes, HttpStatus.OK);
    }
    
}
