package com.quizzap.backend.dto;

import java.util.Date;

public record ScoreDto(Long id, String username, String category, int score, Date date) {

}