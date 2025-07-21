package com.github.kdudley9.orion.services;

import org.springframework.stereotype.Service;

import com.github.kdudley9.orion.dtos.UserDto;
import com.github.kdudley9.orion.mappers.UserMapper;
import com.github.kdudley9.orion.models.User;
import com.github.kdudley9.orion.repositories.UserRepository;
import com.github.kdudley9.orion.security.UserFacade;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserFacade userFacade;

    public UserService(UserRepository userRepository, UserMapper userMapper, UserFacade userFacade) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.userFacade = userFacade;
    }

    public UserDto getUserDetails() {
        User user = this.userRepository.findById(userFacade.getCurrentUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));
        
        return userMapper.toDto(user);
    }
}
