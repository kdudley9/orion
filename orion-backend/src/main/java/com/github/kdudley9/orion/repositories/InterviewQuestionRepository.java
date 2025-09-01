package com.github.kdudley9.orion.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.github.kdudley9.orion.models.InterviewQuestion;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
    List<InterviewQuestion> findByApplicationDetailsId(Long applicationId);

    int deleteByApplicationDetailsId(Long applicationId);

    int deleteByIdAndApplicationDetailsId(Long interviewQuestionId, Long applicationId);

    @Modifying
    @Query
    (
        value = "DELETE FROM interview_question i\r\n" + //
                "WHERE i.application_details_id = :applicationId\r\n" + //
                "AND i.is_ai_generated",
        nativeQuery = true
    )
    void deleteGeneratedQuestions(@Param("applicationId") Long applicationId);
}
