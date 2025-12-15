package com.quizzap.backend.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Service
public class EmailService {

  private final JavaMailSender mailSender;

  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  @Async
  public void sendHtmlEmail(String from, String to, String subject, String htmlContent) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true);
      helper.setFrom(from);
      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(htmlContent, true);

      // logo in src/main/resources/assets/logo.png
      Resource logo = new ClassPathResource("assets/logo.png");
      helper.addInline("logo", logo);

      mailSender.send(message);
    } catch (Exception e) {
      System.err.println("Errore invio email HTML: " + e.getMessage());
    }
  }

  public void sendVerificationEmail(String toEmail, String username, String verificationToken) {
    String verificationUrl = "http://localhost:8080/api/auth/confirm?token=" + verificationToken;

    try {
      // Carica template e sostituisci placeholder manualmente
      String htmlTemplate = new String(
          Objects.requireNonNull(EmailService.class.getResourceAsStream("/templates/verification-email.html"))
              .readAllBytes(),
          StandardCharsets.UTF_8);

      // Sostituisci placeholder
      String htmlContent = htmlTemplate
          .replace("${username}", username)
          .replace("${verificationUrl}", verificationUrl);

      sendHtmlEmail(
          "alfredorubino04@gmail.com",
          toEmail,
          "Conferma il tuo account QuizZap",
          htmlContent // Passa HTML già processato
      );
    } catch (Exception e) {
      System.err.println("Errore invio email verifica: " + e.getMessage());
    }
  }
}
