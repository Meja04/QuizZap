package com.quizzap.backend.mapper;

import org.springframework.stereotype.Component;

import com.quizzap.backend.dto.CategoryDto;
import com.quizzap.backend.entity.Category;

@Component
public class CategoryMapper {

  public CategoryDto toDto(Category category) {
    return new CategoryDto(
        category.getId(),
        category.getName(),
        category.getDescription(),
        category.getIcon());
  }

  public Category toEntity(CategoryDto categoryDto) {
    return new Category(
        categoryDto.id(),
        categoryDto.name(),
        categoryDto.description(),
        categoryDto.icon());
  }
}
