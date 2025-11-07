package com.quizzap.backend.dto;

import java.time.LocalDate;

public record ScoreDto(Long id, String username, String category, int score, LocalDate date) {

}