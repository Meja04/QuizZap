# Usa un'immagine che contiene Java 21 e Maven
FROM maven:3.9-eclipse-temurin-21

# Imposta la directory di lavoro dentro il container
WORKDIR /app

# Copia tutto il progetto nella directory /app
COPY . .

# Compila l'applicazione e crea il file JAR
RUN mvn clean package -DskipTests

# Esponi la porta 8080 (dove gira Spring Boot)
EXPOSE 8080

# Comando per avviare l'applicazione
CMD ["java", "-jar", "target/quizzap-backend-0.0.1-SNAPSHOT.jar"]
