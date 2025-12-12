package com.quizzap.backend.service;

import com.quizzap.backend.entity.User;
import com.quizzap.backend.repository.UserRepository;
import com.quizzap.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;
  private final EmailService emailService;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
      EmailService emailService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
    this.emailService = emailService;
  }

  public void register(String username, String email, String password) {
    // 1. Controlla se username esiste già
    if (userRepository.findByUsername(username).isPresent()) {
      throw new IllegalArgumentException("Username già in uso");
    }

    // 2. Crea nuovo utente INATTIVO
    User user = new User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    user.setActive(false);
    userRepository.save(user);

    // 3. Genera TOKEN VERIFICA
    String verificationToken = jwtUtil.generateVerificationToken(user.getId(), 24 * 60 * 60 * 1000L);

    // 4. Manda email con verificationToken VIA RABBITMQ
    emailService.sendVerificationEmail(email, username, verificationToken);
  }

  public String login(String username, String password) {
    // 1. Cerca utente
    User user = userRepository.findByUsername(username).orElse(null);

    // 2. Verifica utente, password e attivo
    if (user == null || !passwordEncoder.matches(password, user.getPassword()) || !user.isActive()) {
      throw new IllegalArgumentException("Credenziali non valide o account non verificato");
    }

    // 3. Genera JWT LOGIN
    return jwtUtil.generateToken(username);
  }
}
