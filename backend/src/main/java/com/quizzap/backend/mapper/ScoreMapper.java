package com.quizzap.backend.mapper;

import org.springframework.stereotype.Component;

import com.quizzap.backend.dto.ScoreDto;
import com.quizzap.backend.entity.Score;

@Component
public class ScoreMapper {

  public ScoreDto toDto(Score score) {
    return new ScoreDto(
        score.getId(),
        score.getUsername(),
        score.getCategory(),
        score.getScore(),
        score.getDate());
  }

  public Score toEntity(ScoreDto scoreDto) {
    return new Score(
        scoreDto.id(),
        scoreDto.username(),
        scoreDto.category(),
        scoreDto.score(),
        scoreDto.date());
  }
}