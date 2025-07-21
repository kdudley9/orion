package com.github.kdudley9.orion.enums;

public enum JobType {
    FULL_TIME,
    PART_TIME,
    CONTRACT,
    INTERNSHIP,
    TEMPORARY,
    OTHER;

    @Override
    public String toString() {
        return super.toString().replace('_', ' ');
    }
}
