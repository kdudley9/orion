package com.github.kdudley9.orion.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.kdudley9.orion.enums.Industry;
import com.github.kdudley9.orion.enums.JobType;
import com.github.kdudley9.orion.enums.Status;
import com.github.kdudley9.orion.models.ApplicationDetails;

public interface ApplicationDetailsRepository extends JpaRepository<ApplicationDetails, Long> {
    
    List<ApplicationDetails> findByUserId(String userId);

    int deleteByUserId(String userId);

    int deleteByIdAndUserId(Long applicationId, String userId);

    int countByUserId(String userId);

    int countByUserIdAndStatus(String userId, Status status);

    int countByUserIdAndIndustry(String userId, Industry industry);

    int countByUserIdAndJobType(String userId, JobType jobType);
}
