package com.quizzap.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizzap.backend.dto.CategoryDto;
import com.quizzap.backend.service.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {

  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  // GET ALL CATEGORIES
  @GetMapping()
  public ResponseEntity<List<CategoryDto>> getAllCategories() {
    List<CategoryDto> categories = categoryService.getAllCategories();
    return ResponseEntity.status(HttpStatus.OK).body(categories);
  }

}
