package com.quizzap.backend.service;

import java.util.List;

import com.quizzap.backend.dto.CategoryDto;

public interface CategoryService {

  List<CategoryDto> getAllCategories();
}
