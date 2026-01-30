package com.quizzap.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizzap.backend.entity.User;
import com.quizzap.backend.repository.UserRepository;
import com.quizzap.backend.security.JwtUtil;
import com.quizzap.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  record AuthRequest(String username, String email, String password) {
  }

  record AuthResponse(String token, String username) {
  }

  private final AuthService authService;
  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;

  @Value("${app.frontend.base-url:http://localhost:4200}")
  private String frontendUrl;

  public AuthController(AuthService authService, UserRepository userRepository, JwtUtil jwtUtil) {
    this.authService = authService;
    this.userRepository = userRepository;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody AuthRequest request) {
    try {
      authService.register(request.username(), request.email(), request.password());
      return ResponseEntity.ok("Utente creato. Controlla email per confermare.");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest request) {
    try {
      String token = authService.login(request.username(), request.password());
      return ResponseEntity.ok(new AuthResponse(token, request.username()));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/confirm")
  public ResponseEntity<?> confirmAccount(@RequestParam String token) {
    try {
      // 1. Estrae userId dal token verifica
      Long userId = jwtUtil.extractUserId(token);

      if (userId == null) {
        // Token invalido -> redirect login con errore
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
            .header("Location", frontendUrl + "/login?error=invalid_token")
            .body("Token non valido");
      }

      // 2. Trova utente e attiva
      User user = userRepository.findById(userId).orElse(null);
      if (user == null) {
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
            .header("Location", "http://localhost:4200/login?error=user_not_found")
            .body("Utente non trovato");
      }

      // 3. Attiva account
      user.setActive(true);
      userRepository.save(user);

      // 4. SUCCESS -> Redirect login con messaggio positivo
      return ResponseEntity.status(HttpStatus.SEE_OTHER) // 303
          .header("Location", "http://localhost:4200/login?verified=true&username=" + user.getUsername())
          .body("Account confermato!");

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.SEE_OTHER)
          .header("Location", "http://localhost:4200/login?error=confirmation_failed")
          .body("Errore conferma account");
    }
  }
}
