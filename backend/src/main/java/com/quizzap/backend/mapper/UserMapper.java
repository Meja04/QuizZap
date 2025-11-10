package com.quizzap.backend.mapper;

import org.springframework.stereotype.Component;

import com.quizzap.backend.dto.UserDto;
import com.quizzap.backend.entity.User;

@Component
public class UserMapper {

  public UserDto toDto(User user) {
    return new UserDto(
        user.getId(),
        user.getUsername(),
        user.getEmail(),
        user.getPassword());
  }

  public User toEntity(UserDto userDto) {
    return new User(
        userDto.id(),
        userDto.username(),
        userDto.email(),
        userDto.password());
  }
}
