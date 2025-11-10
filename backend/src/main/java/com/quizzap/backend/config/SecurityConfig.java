package com.quizzap.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // disabilita CSRF (non serve con JWT)
        .cors(cors -> {
        }) // abilita CORS (Angular su porta diversa)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll() // ← login/register pubblici
            .requestMatchers("/api/categories/**", "/api/questions/**").permitAll() // dati quiz pubblici
            .anyRequest().authenticated() // tutto il resto richiede JWT
        );

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // critta le password
  }
}
