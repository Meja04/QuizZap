package com.quizzap.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.quizzap.backend.service.CategoryService;
import com.quizzap.backend.dto.CategoryDto;
import com.quizzap.backend.entity.Category;
import com.quizzap.backend.repository.CategoryRepository;
import com.quizzap.backend.mapper.CategoryMapper;

@Service
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;
  private final CategoryMapper categoryMapper;

  public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
    this.categoryRepository = categoryRepository;
    this.categoryMapper = categoryMapper;
  }

  @Override
  public List<CategoryDto> getAllCategories() {
    List<Category> categories = categoryRepository.findAll();
    return categories
        .stream()
        .map(categoryMapper::toDto)
        .toList();
  }

}
