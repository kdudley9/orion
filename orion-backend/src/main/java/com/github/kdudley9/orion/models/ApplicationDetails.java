package com.github.kdudley9.orion.models;

import java.time.LocalDateTime;

import org.hibernate.validator.constraints.URL;

import com.github.kdudley9.orion.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class ApplicationDetails {
    @Id
    @GeneratedValue
    private Long id;
    @NotBlank(message = "Company name cannot be blank.")
    @Size(max = 75)
    private String company;
    @NotBlank(message = "Job title cannot be blank.")
    @Size(max = 75)
    @Column(name = "job_title")
    private String jobTitle;
    @NotNull(message = "Location cannot be null.")
    private String location;
    @NotBlank(message = "url cannot be blank.")
    @Size(max = 2048)
    @URL(message = "URL is invalid")
    private String url;
    @Size(max = 2000)
    private String note;
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
