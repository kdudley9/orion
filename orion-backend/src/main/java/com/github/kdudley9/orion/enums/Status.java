package com.github.kdudley9.orion.enums;

public enum Status {
    APPLIED,
    ONLINE_ASSESSMENT,
    INTERVIEW,
    OFFER,
    REJECTED,
    GHOSTED;

    @Override
    public String toString() {
        return super.toString().replace('_', ' ');
    }
}
