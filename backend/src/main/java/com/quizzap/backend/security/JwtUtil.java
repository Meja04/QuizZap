package com.quizzap.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

  private final SecretKey key = Keys.hmacShaKeyFor(
      "questa-e-una-chiave-segreta-molto-lunga-di-almeno-256-bit".getBytes());

  public String generateToken(String username) {
    return Jwts.builder()
        .subject(username) // imposta username come subject
        .issuedAt(new Date()) // data di emissione
        .expiration(new Date(System.currentTimeMillis() + 86400000)) // valido 24h
        .signWith(key) // firma con chiave segreta
        .compact(); // costruisce il token JWT
  }

  // Estrae username dal token
  public String extractUsername(String token) {
    return Jwts.parser()
        .verifyWith(key) // verifica con la chiave segreta
        .build() //
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

  // Verifica se JWT è valido
  public boolean isValid(String token) {
    try {
      Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
      return true;
    } catch (Exception e) {
      return false; // token non valido o scaduto
    }
  }
}
