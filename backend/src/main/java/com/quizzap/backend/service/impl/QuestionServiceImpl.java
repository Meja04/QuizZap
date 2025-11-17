package com.quizzap.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.quizzap.backend.service.QuestionService;
import com.quizzap.backend.dto.QuestionDto;
import com.quizzap.backend.entity.Question;
import com.quizzap.backend.repository.QuestionRepository;
import com.quizzap.backend.mapper.QuestionMapper;

@Service
public class QuestionServiceImpl implements QuestionService {

  private final QuestionRepository questionRepository;
  private final QuestionMapper questionMapper;

  public QuestionServiceImpl(QuestionRepository questionRepository, QuestionMapper questionMapper) {
    this.questionRepository = questionRepository;
    this.questionMapper = questionMapper;
  }

  @Override
  public List<QuestionDto> getQuestionsByCategory(String categoryName) {
    List<Question> questions = questionRepository.findByCategoryName(categoryName);
    return questions
        .stream()
        .map(questionMapper::toDto)
        .toList();
  }
}
