package com.github.kdudley9.orion.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.kdudley9.orion.dtos.UserDto;
import com.github.kdudley9.orion.mappers.UserMapper;
import com.github.kdudley9.orion.models.User;
import com.github.kdudley9.orion.repositories.UserRepository;
import com.github.kdudley9.orion.security.UserFacade;

@RestController
@RequestMapping("/api/user-details")
public class UserController {

    private final UserRepository userRepository;
    private final UserFacade userFacade;
    private final UserMapper userMapper;

    public UserController(UserRepository userRepository, UserFacade userFacade, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userFacade = userFacade;
        this.userMapper = userMapper;
    }

    @GetMapping
    public ResponseEntity<UserDto> getUserDetails() {
        User user = this.userRepository.findById(userFacade.getCurrentUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));

        return new ResponseEntity<>(this.userMapper.toDto(user), HttpStatus.OK);
    }
}
