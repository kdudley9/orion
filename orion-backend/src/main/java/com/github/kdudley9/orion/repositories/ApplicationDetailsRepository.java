package com.github.kdudley9.orion.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.kdudley9.orion.models.ApplicationDetails;

public interface ApplicationDetailsRepository extends JpaRepository<ApplicationDetails, Long> {
    List<ApplicationDetails> findByUserId(String userId);

    void deleteByUserId(String userId);

    void deleteByIdAndUserId(Long applicationId, String userId);
}
