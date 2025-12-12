package com.quizzap.backend.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Service
public class EmailService {

  private final JavaMailSender mailSender;

  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  @Async
  public void sendHtmlEmail(String from, String to, String subject, String htmlContent, String inlineImagePath) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true);
      helper.setFrom(from);
      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(htmlContent, true);
      helper.addInline("logo.png", new File(inlineImagePath));
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

      // logo in src/main/resources/assets/logo.png
      String logoPath = Objects.requireNonNull(
          EmailService.class.getResource("/assets/logo.png")).getPath();

      sendHtmlEmail(
          "alfredorubino04@gmail.com",
          toEmail,
          "Conferma il tuo account QuizZap",
          htmlContent, // Passa HTML già processato
          logoPath);
    } catch (Exception e) {
      // Per ora logga solo. Puoi migliorare più avanti.
      System.err.println("Errore invio email verifica: " + e.getMessage());
    }
  }
}
