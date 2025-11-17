package com.quizzap.backend.dto;

import java.util.Date;

public record ScoreDto(Long id, Long userId, String username, Long categoryId, String categoryName, int score,
    Date date) {

}