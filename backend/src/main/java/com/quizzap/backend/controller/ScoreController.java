package com.quizzap.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizzap.backend.dto.ScoreDto;
import com.quizzap.backend.service.ScoreService;

@RestController
@RequestMapping("/api")
public class ScoreController {

  private final ScoreService scoreService;

  public ScoreController(ScoreService scoreService) {
    this.scoreService = scoreService;
  }

  // GET ALL USERS
  @GetMapping()
  public ResponseEntity<List<ScoreDto>> getAllScores() {
    List<ScoreDto> scores = scoreService.getAllScores();
    return ResponseEntity.status(HttpStatus.OK).body(scores);
  }

  // SAVE SCORE
  @PostMapping("/scores")
  public ResponseEntity<ScoreDto> saveScore(@RequestBody ScoreDto scoreDto) {
    ScoreDto savedScore = scoreService.saveScore(scoreDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedScore);
  }

  // GET SCORES BY CATEGORY
  @GetMapping("/scores/{category}")
  public ResponseEntity<List<ScoreDto>> getScoresByCategory(@PathVariable String category) {
    List<ScoreDto> scores = scoreService.getScoresByCategory(category);
    return ResponseEntity.status(HttpStatus.OK).body(scores);
  }

}
