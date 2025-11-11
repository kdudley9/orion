package com.github.kdudley9.orion.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.github.kdudley9.orion.dtos.UpcomingInterviewDto;
import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.Interview;
import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByApplicationDetailsOrderByInterviewDateDesc(ApplicationDetails applicationDetails);

    int deleteByApplicationDetailsId(Long applicationId);

    int deleteByIdAndApplicationDetailsId(Long interviewId, Long applicationId);

    @Query(name = "upcoming_interview_dto", nativeQuery = true)
    UpcomingInterviewDto findUpcomingInterview(@Param("userId") String userId);
}
