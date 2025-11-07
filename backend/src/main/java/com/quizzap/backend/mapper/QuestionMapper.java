package com.quizzap.backend.mapper;

import org.springframework.stereotype.Component;

import com.quizzap.backend.dto.QuestionDto;
import com.quizzap.backend.entity.Question;

@Component
public class QuestionMapper {

  public QuestionDto toDto(Question question) {
    return new QuestionDto(
        question.getId(),
        question.getQuestion(),
        question.getOptions(),
        question.getCorrectOptionIndex(),
        question.getCategory());
  }

  public Question toEntity(QuestionDto questionDto) {
    return new Question(
        questionDto.id(),
        questionDto.question(),
        questionDto.options(),
        questionDto.correctOptionIndex(),
        questionDto.category());
  }
}