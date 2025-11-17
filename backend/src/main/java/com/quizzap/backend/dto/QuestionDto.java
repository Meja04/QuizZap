package com.quizzap.backend.dto;

import java.util.List;

public record QuestionDto(Long id, String question, List<String> options, int correctOptionIndex, Long categoryId) {

}
