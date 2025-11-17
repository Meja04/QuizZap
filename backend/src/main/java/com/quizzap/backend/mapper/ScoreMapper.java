package com.quizzap.backend.mapper;

import org.springframework.stereotype.Component;

import com.quizzap.backend.dto.ScoreDto;
import com.quizzap.backend.entity.Category;
import com.quizzap.backend.entity.Score;
import com.quizzap.backend.entity.User;
import com.quizzap.backend.repository.CategoryRepository;
import com.quizzap.backend.repository.UserRepository;

@Component
public class ScoreMapper {

  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

  public ScoreMapper(UserRepository userRepository, CategoryRepository categoryRepository) {
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
  }

  public ScoreDto toDto(Score score) {
    return new ScoreDto(
        score.getId(),
        score.getUser().getId(),
        score.getUser().getUsername(),
        score.getCategory().getId(),
        score.getCategory().getName(),
        score.getScore(),
        score.getDate());
  }

  public Score toEntity(ScoreDto scoreDto) {

    User user;
    if (scoreDto.userId() != null) {
      user = userRepository.findById(scoreDto.userId())
          .orElseThrow(() -> new RuntimeException("User not found with id: " + scoreDto.userId()));
    } else {
      user = userRepository.findByUsername(scoreDto.username())
          .orElseThrow(() -> new RuntimeException("User not found with username: " + scoreDto.username()));
    }

    Category category = categoryRepository.findById(scoreDto.categoryId())
        .orElseThrow(() -> new RuntimeException("Category not found with id: " + scoreDto.categoryId()));

    return new Score(
        scoreDto.id(),
        user,
        category,
        scoreDto.score(),
        scoreDto.date());
  }
}
