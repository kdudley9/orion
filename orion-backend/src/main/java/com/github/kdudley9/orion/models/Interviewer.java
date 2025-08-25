package com.github.kdudley9.orion.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class Interviewer {
    private String name;
    private String email;    
    private String phoneNumber;

    private Interviewer() {
    }

    private Interviewer(String name, String email, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "Interviewer [name=" + name + ", email=" + email + ", phoneNumber=" + phoneNumber + "]";
    }
}
