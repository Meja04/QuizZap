package com.quizzap.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizzap.backend.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

  // Query method: Spring Data JPA genera automaticamente la query SQL
  // SELECT * FROM questions WHERE category = ?
  // Usato da QuizService.getQuestionsByCategory(category)
  List<Question> findByCategory(String category);

}
