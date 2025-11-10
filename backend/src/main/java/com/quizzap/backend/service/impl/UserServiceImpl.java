package com.quizzap.backend.service.impl;

import org.springframework.stereotype.Service;

import com.quizzap.backend.mapper.UserMapper;
import com.quizzap.backend.repository.UserRepository;
import com.quizzap.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
  }

}
