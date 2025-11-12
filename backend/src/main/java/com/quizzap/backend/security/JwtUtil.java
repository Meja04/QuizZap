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
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(key)
        .compact();
  }

  // Estrae username dal token
  public String extractUsername(String token) {
    return Jwts.parser()
        .verifyWith(key)
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

  // Verifica se JWT è valido (versione base)
  public boolean isValid(String token) {
    try {
      Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  // Verifica se JWT è valido per un determinato username
  public boolean validateToken(String token, String username) {
    try {
      String extractedUsername = extractUsername(token);
      return extractedUsername.equals(username) && !isTokenExpired(token);
    } catch (Exception e) {
      return false;
    }
  }

  // Verifica se il token è scaduto
  private boolean isTokenExpired(String token) {
    try {
      Date expiration = Jwts.parser()
          .verifyWith(key)
          .build()
          .parseSignedClaims(token)
          .getPayload()
          .getExpiration();
      return expiration.before(new Date());
    } catch (Exception e) {
      return true;
    }
  }
}
