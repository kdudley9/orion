package com.github.kdudley9.orion.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.InterviewQuestion;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
    List<InterviewQuestion> findByApplicationDetailsId(Long applicationId);

    int deleteByIdAndApplicationDetailsId(Long applicationId, Long interviewQuestionId);
}
