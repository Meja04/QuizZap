package com.quizzap.backend.service;

import com.quizzap.backend.config.RabbitConfig;
import com.quizzap.backend.dto.EmailMessage;
import com.quizzap.backend.entity.User;
import com.quizzap.backend.repository.UserRepository;
import com.quizzap.backend.security.JwtUtil;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;
  private final EmailService emailService;
  private final RabbitTemplate rabbitTemplate;

  private static final Logger log = LoggerFactory.getLogger(AuthService.class);

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
      EmailService emailService, RabbitTemplate rabbitTemplate) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
    this.emailService = emailService;
    this.rabbitTemplate = rabbitTemplate;
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
    String token = jwtUtil.generateVerificationToken(user.getId(), 24 * 60 * 60 * 1000L);

    // 4. Manda email con verificationToken VIA RABBITMQ
    Map<String, Object> message = Map.of(
        "email", user.getEmail(),
        "username", user.getUsername(),
        "token", token);
    rabbitTemplate.convertAndSend(RabbitConfig.EMAIL_QUEUE, message);
    log.info("Messaggio RabbitMQ inviato per {}", user.getEmail());
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
