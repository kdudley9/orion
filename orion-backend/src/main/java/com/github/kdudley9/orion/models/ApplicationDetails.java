package com.github.kdudley9.orion.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.URL;
import org.springframework.format.annotation.DateTimeFormat;

import com.github.kdudley9.orion.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class ApplicationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @NotBlank(message = "Company name cannot be blank.")
    private String company;

    @NotBlank(message = "Job title cannot be blank.")
    @Column(name = "job_title")
    private String jobTitle;

    @NotNull(message = "Location cannot be null.")
    private String location;

    @NotBlank(message = "URL cannot be blank.")
    @Size(max = 2048)
    @URL(message = "URL is invalid")
    @Column(columnDefinition = "TEXT")
    private String url;

    @Size(max = 2000)
    @Column(columnDefinition = "TEXT")
    private String note;

    @NotNull(message = "Date applied cannot be null.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_applied", columnDefinition = "DATE")
    private LocalDate dateApplied;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @NotNull(message = "Industry cannot be null.")
    private String industry;

    @NotNull(message = "Status cannot be null.")
    private Status status;

    protected ApplicationDetails() {
    }

    public ApplicationDetails(String company, String jobTitle, String location, String url, String note,
            String industry, Status status) {
        this.company = company;
        this.jobTitle = jobTitle;
        this.location = location;
        this.url = url;
        this.note = note;
        this.industry = industry;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LocalDate getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(LocalDate dateApplied) {
        this.dateApplied = dateApplied;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "ApplicationDetails [id=" + id + ", company=" + company + ", jobTitle=" + jobTitle + ", location="
                + location + ", url=" + url + ", note=" + note + ", dateCreated=" + dateCreated + ", industry="
                + industry + ", status=" + status + "]";
    }
}
