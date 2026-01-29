package com.quizzap.backend.service;

import com.quizzap.backend.config.RabbitConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class EmailListener {
  private final EmailService emailService;

  public EmailListener(EmailService emailService) {
    this.emailService = emailService;
  }

  @RabbitListener(queues = RabbitConfig.EMAIL_QUEUE)
  public void handleEmail(Map<String, Object> payload) {
    System.out.println("Listener chiamato con payload: " + payload);
    emailService.sendVerificationEmail(
        (String) payload.get("email"),
        (String) payload.get("username"),
        (String) payload.get("token"));
  }
}
