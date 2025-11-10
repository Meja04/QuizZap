package com.quizzap.backend.service;

import java.util.List;

import com.quizzap.backend.dto.QuestionDto;

public interface QuestionService {

  List<QuestionDto> getQuestionsByCategory(String category);
}
