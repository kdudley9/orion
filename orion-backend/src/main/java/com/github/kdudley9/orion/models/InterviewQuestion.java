package com.github.kdudley9.orion.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

@Entity
public class InterviewQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @NotBlank
    private String question;

    @Column(columnDefinition = "TEXT")
    private String note;
    private boolean isAiGenerated;

    @ManyToOne
    @JoinColumn(name = "application_details_id")
    private ApplicationDetails applicationDetails;

    
    public InterviewQuestion() {
    }

    public InterviewQuestion(Long id, String question, String note, boolean isAiGenerated) {
        this.id = id;
        this.question = question;
        this.note = note;
        this.isAiGenerated = isAiGenerated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public ApplicationDetails getApplicationDetails() {
        return applicationDetails;
    }

    public void setApplicationDetails(ApplicationDetails applicationDetails) {
        this.applicationDetails = applicationDetails;
    }

    public boolean isAiGenerated() {
        return isAiGenerated;
    }

    public void setAiGenerated(boolean isAiGenerated) {
        this.isAiGenerated = isAiGenerated;
    }

    @Override
    public String toString() {
        return "InterviewQuestion [id=" + id + ", question=" + question + ", note=" + note + ", isAiGenerated="
                + isAiGenerated + ", applicationDetails=" + applicationDetails + "]";
    }
}
