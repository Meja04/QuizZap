package com.quizzap.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.quizzap.backend.entity.User;
import com.quizzap.backend.repository.UserRepository;
import com.quizzap.backend.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;

  public AuthController(UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtUtil jwtUtil) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
  }

  // REGISTRAZIONE
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody AuthRequest request) {
    // 1. Controlla se username esiste già
    if (userRepository.findByUsername(request.username).isPresent()) {
      return ResponseEntity.badRequest().body("Username già in uso");
    }

    // 2. Crea nuovo utente con password crittografata
    User user = new User();
    user.setUsername(request.username);
    user.setEmail(request.email);
    user.setPassword(passwordEncoder.encode(request.password));
    userRepository.save(user);

    // 3. Genera JWT
    String token = jwtUtil.generateToken(user.getUsername());

    // 4. Ritorna JWT ad Angular
    return ResponseEntity.ok(new AuthResponse(token, user.getUsername()));
  }

  // LOGIN
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest request) {
    // 1. Cerca utente nel DB
    User user = userRepository.findByUsername(request.username).orElse(null);

    // 2. Verifica password
    if (user == null || !passwordEncoder.matches(request.password, user.getPassword())) {
      return ResponseEntity.badRequest().body("Credenziali non valide");
    }

    // 3. Genera JWT
    String token = jwtUtil.generateToken(user.getUsername());

    // 4. Ritorna JWT ad Angular
    return ResponseEntity.ok(new AuthResponse(token, user.getUsername()));
  }

  // DTO per richieste
  record AuthRequest(String username, String email, String password) {
  }

  // DTO per risposta
  record AuthResponse(String token, String username) {
  }
}