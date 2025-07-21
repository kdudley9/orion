package com.github.kdudley9.orion.models;

import java.util.Map;

public class UserInfo {
    private Map<String, Object> attributes;

    public UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getId() {
        return (String) attributes.get("sub");
    }

    public String getName() {
        return (String) attributes.get("name");
    }

    public String getEmail() {
        return (String) attributes.get("email");
    }

    public String getPicture() {
        return (String) attributes.get("picture");
    }
}
