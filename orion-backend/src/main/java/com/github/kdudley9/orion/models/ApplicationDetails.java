package com.github.kdudley9.orion.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.URL;

import com.github.kdudley9.orion.enums.Industry;
import com.github.kdudley9.orion.enums.JobType;
import com.github.kdudley9.orion.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(name = "date_applied", columnDefinition = "DATE")
    private LocalDate dateApplied;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @NotNull(message = "Industry cannot be null.")
    @Enumerated(EnumType.STRING)
    private Industry industry;

    @NotNull(message = "Application status cannot be null.")
    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull(message = "Job type cannot be null.")
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private JobType jobType;

    private boolean favorite;
    private boolean archived;

    @NotNull(message = "User cannot be null.")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public ApplicationDetails() {
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

    public Industry getIndustry() {
        return industry;
    }

    public void setIndustry(Industry industry) {
        this.industry = industry;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status == null ? Status.APPLIED : status;
    }

    public JobType getJobType() {
        return jobType;
    }

    public void setJobType(JobType jobType) {
        this.jobType = jobType;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "ApplicationDetails [id=" + id + ", company=" + company + ", jobTitle=" + jobTitle + ", location="
                + location + ", url=" + url + ", note=" + note + ", dateApplied=" + dateApplied + ", dateCreated="
                + dateCreated + ", industry=" + industry + ", status=" + status + ", jobType=" + jobType + ", favorite="
                + favorite + ", archived=" + archived + "]";
    }

}
