package com.quizzap.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.quizzap.backend.service.ScoreService;
import com.quizzap.backend.dto.ScoreDto;
import com.quizzap.backend.entity.Score;
import com.quizzap.backend.repository.ScoreRepository;
import com.quizzap.backend.mapper.ScoreMapper;

@Service
public class ScoreServiceImpl implements ScoreService {

  private final ScoreRepository scoreRepository;
  private final ScoreMapper scoreMapper;

  public ScoreServiceImpl(ScoreRepository scoreRepository, ScoreMapper scoreMapper) {
    this.scoreRepository = scoreRepository;
    this.scoreMapper = scoreMapper;
  }

  @Override
  public List<ScoreDto> getAllScores() {
    List<Score> scores = scoreRepository.findAll();
    return scores
        .stream()
        .map(scoreMapper::toDto)
        .toList();
  }

  @Override
  public ScoreDto saveScore(ScoreDto scoreDto) {
    // conversione DTO -> Entity
    Score score = scoreMapper.toEntity(scoreDto);
    // salva nel database (Hibernate genera id se null)
    Score savedScore = scoreRepository.save(score);
    // conversione Entity -> DTO
    return scoreMapper.toDto(savedScore);

  }

  @Override
  public List<ScoreDto> getScoresByCategory(String categoryName) {
    List<Score> scores = scoreRepository.findByCategoryName(categoryName);
    return scores
        .stream()
        .map(scoreMapper::toDto)
        .toList();
  }
}