package com.github.kdudley9.orion.dtos;

import java.util.Map;

import com.github.kdudley9.orion.enums.Industry;
import com.github.kdudley9.orion.enums.Status;

public class DashboardDto {
    private int totalApplications;
    private Map<Status, Integer> statusCounts;
    private Map<Industry, Integer> industryCounts;

    public DashboardDto() {
    }

    public int getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(int totalApplications) {
        this.totalApplications = totalApplications;
    }

    public Map<Status, Integer> getStatusCounts() {
        return statusCounts;
    }

    public void setStatusCounts(Map<Status, Integer> statusCounts) {
        this.statusCounts = statusCounts;
    }

    public Map<Industry, Integer> getIndustryCounts() {
        return industryCounts;
    }

    public void setIndustryCounts(Map<Industry, Integer> industryCounts) {
        this.industryCounts = industryCounts;
    }

    @Override
    public String toString() {
        return "DashboardDto [totalApplications=" + totalApplications + ", statusCounts=" + statusCounts
                + ", industryCounts=" + industryCounts + "]";
    }

}
