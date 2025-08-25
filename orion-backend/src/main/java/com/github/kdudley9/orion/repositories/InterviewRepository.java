package com.github.kdudley9.orion.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.kdudley9.orion.models.ApplicationDetails;
import com.github.kdudley9.orion.models.Interview;
import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByApplicationDetails(ApplicationDetails applicationDetails);

    int deleteByIdAndApplicationDetails(ApplicationDetails applicationDetails, Long id);
}
