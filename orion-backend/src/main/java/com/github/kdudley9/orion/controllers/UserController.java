package com.github.kdudley9.orion.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kdudley9.orion.dtos.UserDto;
import com.github.kdudley9.orion.services.UserService;

@RestController
@RequestMapping("/api/user-details")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserDto> getUserDetails() {
        return new ResponseEntity<>(this.userService.getUserDetails(), HttpStatus.OK);
    }
}
