package com.github.kdudley9.orion.services;

import java.util.EnumMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.github.kdudley9.orion.dtos.DashboardDto;
import com.github.kdudley9.orion.enums.Industry;
import com.github.kdudley9.orion.enums.Status;
import com.github.kdudley9.orion.repositories.ApplicationDetailsRepository;

@Service
public class DashboardService {
    private final ApplicationDetailsRepository applicationDetailsRepository;

    public DashboardService(ApplicationDetailsRepository applicationDetailsRepository) {
        this.applicationDetailsRepository = applicationDetailsRepository;
    }

    public DashboardDto getDashboardData(String userId) {
        DashboardDto dashboardDto = new DashboardDto();
        dashboardDto.setTotalApplications(applicationDetailsRepository.countByUserId(userId));
        dashboardDto.setStatusCounts(getStatusCounts(userId));
        dashboardDto.setIndustryCounts(getIndustryCounts(userId));
        return dashboardDto;
    }

    private Map<Status, Integer> getStatusCounts(String userId) {
        Map<Status, Integer> statusCounts = new EnumMap<>(Status.class);
        for (Status status : Status.values()) {
            statusCounts.put(status, applicationDetailsRepository.countByUserIdAndStatus(userId, status));
        }

        return statusCounts;
    }

    private Map<Industry, Integer> getIndustryCounts(String userId) {
        Map<Industry, Integer> industryCounts = new EnumMap<>(Industry.class);
        for (Industry industry : Industry.values()) {
            industryCounts.put(industry, applicationDetailsRepository.countByUserIdAndIndustry(userId, industry));
        }

        return industryCounts;
    }
}
