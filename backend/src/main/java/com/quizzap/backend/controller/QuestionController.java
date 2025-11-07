package com.quizzap.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizzap.backend.dto.QuestionDto;
import com.quizzap.backend.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

  private final QuestionService questionService;

  public QuestionController(QuestionService questionService) {
    this.questionService = questionService;
  }

  // GET QUESTIONS BY CATEGORY
  @GetMapping(params = "category")
  public ResponseEntity<List<QuestionDto>> getQuestionsByCategory(@RequestParam String category) {
    List<QuestionDto> questions = questionService.getQuestionsByCategory(category);
    return ResponseEntity.status(HttpStatus.OK).body(questions);
  }

}
