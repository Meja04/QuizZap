package com.quizzap.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizzap.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

  // Query method per filtrare gli utenti al login
  Optional<User> findByUsername(String username);
}
