package com.github.kdudley9.orion.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.kdudley9.orion.models.ApplicationDetails;

public interface ApplicationDetailsRepository extends JpaRepository<ApplicationDetails, Long> {
}
