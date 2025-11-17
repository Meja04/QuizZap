package com.quizzap.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizzap.backend.entity.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {

  // Query method per filtrare punteggi per categoria
  // SELECT * FROM scores WHERE category = ?
  // Usato da ScoreService.getScoresByCategory(category)
  List<Score> findByCategoryName(String categoryName);

  List<Score> findByUserId(Long userId);
}
