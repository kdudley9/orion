package com.github.kdudley9.orion.models;

import java.time.LocalDate;
import java.util.Set;

import com.github.kdudley9.orion.dtos.UpcomingInterviewDto;
import com.github.kdudley9.orion.enums.InterviewType;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.SqlResultSetMapping;

@Entity
@NamedNativeQuery(
    name = "upcoming_interview_dto",
    query = 
        "SELECT \r\n" + //
        "interview_date AS interviewDate, \r\n" + //
        "i.location AS location, \r\n" + //
        "meeting_link AS meetingLink, \r\n" + //
        "interview_type AS interviewType,\r\n" + //
        "company,\r\n" + //
        "job_title AS jobTitle\r\n" + //
        "FROM interview i \r\n" + //
        "JOIN application_details ad ON ad.id = i.application_details_id \r\n" + //
        "WHERE ad.user_id = :userId\r\n" + //
        "AND i.interview_date >= CURRENT_DATE\r\n" + //
        "ORDER BY ABS(interview_date - CURRENT_DATE)\r\n" + //
        "LIMIT 1",
    resultSetMapping = "upcoming_interview_dto"
)
@SqlResultSetMapping(
    name = "upcoming_interview_dto",
    classes = @ConstructorResult(
        targetClass = UpcomingInterviewDto.class,
        columns = {
            @ColumnResult(name = "interviewDate", type = LocalDate.class),
            @ColumnResult(name = "location", type = String.class),
            @ColumnResult(name = "meetingLink", type = String.class),
            @ColumnResult(name = "interviewType", type = InterviewType.class),
            @ColumnResult(name = "company", type = String.class),
            @ColumnResult(name = "jobTitle", type = String.class)
        }
    )
)
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "interview_date")
    private LocalDate interviewDate;
    private String location;

    @Column(name = "meeting_link")
    private String meetingLink;

    @Column(name = "interview_type")
    @Enumerated(EnumType.STRING)
    private InterviewType interviewType;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "interview_interviewers", joinColumns = @JoinColumn(name = "interview_id"))
    private Set<Interviewer> interviewers;

    @ManyToOne
    @JoinColumn(name = "application_details_id")
    private ApplicationDetails applicationDetails;

    public Interview() {
    }

    public Interview(LocalDate interviewDate, String location, String meetingLink, InterviewType interviewType, Set<Interviewer> interviewers) {
        this.interviewDate = interviewDate;
        this.location = location;
        this.meetingLink = meetingLink;
        this.interviewType = interviewType;
        this.interviewers = interviewers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public InterviewType getInterviewType() {
        return interviewType;
    }

    public void setInterviewType(InterviewType interviewType) {
        this.interviewType = interviewType;
    }

    public Set<Interviewer> getInterviewers() {
        return interviewers;
    }

    public void setInterviewers(Set<Interviewer> interviewers) {
        this.interviewers = interviewers;
    }

    public ApplicationDetails getApplicationDetails() {
        return applicationDetails;
    }

    public void setApplicationDetails(ApplicationDetails applicationDetails) {
        this.applicationDetails = applicationDetails;
    }

    @Override
    public String toString() {
        return "Interview [id=" + id + ", interviewDate=" + interviewDate + ", location=" + location + ", meetingLink="
                + meetingLink + ", interviewType=" + interviewType + ", interviewers=" + interviewers
                + ", applicationDetails=" + applicationDetails + "]";
    }
}
