package com.quizzap.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizzap.backend.dto.ScoreDto;
import com.quizzap.backend.service.ScoreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

  private final ScoreService scoreService;

  public ScoreController(ScoreService scoreService) {
    this.scoreService = scoreService;
  }

  // GET ALL SCORES
  @Operation(summary = "Get all scores", description = "Restituisce la lista di tutti i punteggi")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Scores found"),
      @ApiResponse(responseCode = "404", description = "Scores not found")
  })
  @GetMapping(params = {}) // swagger ui non mostra endpoint
  public ResponseEntity<List<ScoreDto>> getAllScores() {
    List<ScoreDto> scores = scoreService.getAllScores();
    return ResponseEntity.status(HttpStatus.OK).body(scores);
  }

  // SAVE SCORE
  @Operation(summary = "Save score", description = "Salva un nuovo punteggio")
  @PostMapping()
  public ResponseEntity<ScoreDto> saveScore(@RequestBody ScoreDto scoreDto) {
    ScoreDto savedScore = scoreService.saveScore(scoreDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedScore);
  }

  // GET SCORES BY CATEGORY
  @Operation(summary = "Get scores by category", description = "Restituisce la lista di punteggi filtrati per categoria")
  @GetMapping(params = "category")
  public ResponseEntity<List<ScoreDto>> getScoresByCategory(
      @Parameter(in = ParameterIn.QUERY, required = true, description = "Categoria per filtrare i punteggi") @RequestParam String category) {
    List<ScoreDto> scores = scoreService.getScoresByCategory(category);
    return ResponseEntity.status(HttpStatus.OK).body(scores);
  }

}
