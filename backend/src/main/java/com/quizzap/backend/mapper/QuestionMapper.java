package com.quizzap.backend.mapper;

import org.springframework.stereotype.Component;

import com.quizzap.backend.dto.QuestionDto;
import com.quizzap.backend.entity.Category;
import com.quizzap.backend.entity.Question;
import com.quizzap.backend.repository.CategoryRepository;

@Component
public class QuestionMapper {

  private final CategoryRepository categoryRepository;

  public QuestionMapper(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public QuestionDto toDto(Question question) {
    return new QuestionDto(
        question.getId(),
        question.getQuestion(),
        question.getOptions(),
        question.getCorrectOptionIndex(),
        question.getCategory().getId());
  }

  public Question toEntity(QuestionDto questionDto) {
    Category category = categoryRepository.findById(questionDto.categoryId())
        .orElseThrow(() -> new RuntimeException("Category not found with id: " + questionDto.categoryId()));

    return new Question(
        questionDto.id(),
        questionDto.question(),
        questionDto.options(),
        questionDto.correctOptionIndex(),
        category);
  }
}