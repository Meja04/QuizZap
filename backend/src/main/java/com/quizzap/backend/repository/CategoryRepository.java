package com.quizzap.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizzap.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
