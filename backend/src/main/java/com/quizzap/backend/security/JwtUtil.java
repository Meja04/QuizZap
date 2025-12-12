package com.quizzap.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

  // In produzione usare variabili d'ambiente per la key
  private final SecretKey key = Keys.hmacShaKeyFor(
      "questa-e-una-chiave-segreta-molto-lunga-di-almeno-256-bit".getBytes());

  // Metodo helper per estrarre i claims dal token
  private Claims extractClaims(String token) {
    return Jwts.parser() // Crea builder per parser JWT
        .verifyWith(key) // Imposta chiave segreta per verifica
        .build() // Costruisce il parser configurato
        .parseSignedClaims(token) // Legge token e verifica firma/scadenza
        .getPayload(); // Estrae claims (payload) dal token
  }

  // Genera token JWT per uno username
  public String generateToken(String username) {
    return Jwts.builder()
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(key)
        .compact();
  }

  // Estrae il subject username dal token
  public String extractUsername(String token) {
    try {
      return extractClaims(token).getSubject();
    } catch (Exception e) {
      return null;
    }
  }

  // Verifica se JWT è valido
  public boolean isValid(String token) {
    try {
      extractClaims(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  // Verifica se JWT è valido per un determinato username
  // Ritorna true solo se il token è valido e lo username corrisponde
  public boolean validateToken(String token, String username) {
    try {
      String extractedUsername = extractUsername(token);
      return extractedUsername != null
          && extractedUsername.equals(username)
          && !isTokenExpired(token);
    } catch (Exception e) {
      return false;
    }
  }

  // Verifica se il token è scaduto
  // Ritorna true se la data attuale è dopo la data di scadenza del token
  private boolean isTokenExpired(String token) {
    try {
      Date expiration = extractClaims(token).getExpiration();
      return expiration.before(new Date());
    } catch (Exception e) {
      return true;
    }
  }

  // PER I TOKEN DI VERIFICA EMAIL

  // Genera token verifica con scadenza custom (ore)
  public String generateVerificationToken(Long userId, long expirationMs) {
    return Jwts.builder()
        .claim("userId", userId) // ID utente invece di username
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expirationMs))
        .signWith(key)
        .compact();
  }

  // Estrae userId dal token verifica
  public Long extractUserId(String token) {
    try {
      return extractClaims(token).get("userId", Long.class);
    } catch (Exception e) {
      return null;
    }
  }

}