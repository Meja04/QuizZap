package com.quizzap.backend.service;

import java.util.List;

import com.quizzap.backend.dto.ScoreDto;

public interface ScoreService {

  List<ScoreDto> getAllScores();

  ScoreDto saveScore(ScoreDto scoreDto);

  List<ScoreDto> getScoresByCategory(String category);
}
