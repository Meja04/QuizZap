package com.quizzap.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizzap.backend.entity.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {

}
