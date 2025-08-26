package com.github.kdudley9.orion.enums;

public enum InterviewType {
    PHONE_SCREEN,
    TECHNICAL,
    BEHAVIORAL,
    PANEL,
    GROUP,
    OTHER;

    @Override
    public String toString() {
        return super.toString().replace('_', ' ');
    }
}
