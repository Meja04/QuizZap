package com.quizzap.backend.entity;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "questions")
public class Question {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String question;

  @ElementCollection
  private List<String> options;

  private int correctOptionIndex;
  private String category;

  public Question() {
  }

  public Question(Long id, String question, List<String> options, int correctOptionIndex, String category) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.correctOptionIndex = correctOptionIndex;
    this.category = category;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public List<String> getOptions() {
    return options;
  }

  public void setOptions(List<String> options) {
    this.options = options;
  }

  public int getCorrectOptionIndex() {
    return correctOptionIndex;
  }

  public void setCorrectOptionIndex(int correctOptionIndex) {
    this.correctOptionIndex = correctOptionIndex;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }
}
