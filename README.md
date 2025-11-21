# QuizZap - Full Stack Version (Angular + Spring)

Il progetto nasce come estensione del sistema sviluppato durante l'esperienza di stage curricolare presso l'azienda Sync Lab S.r.l., integrando alla versione con front-end in Angular un back-end Spring.
L'applicazione consiste in una piattaforma di quiz online che permette agli utenti di rispondere a domande su diverse categorie, con gestione utenti e classifiche. La versione attuale integra:

## Descrizione generale

- **Frontend** in Angular, responsivo e basato su componenti modulari
- **Backend** in Spring Boot, con API REST sicure via Spring Security e autenticazione JWT
- **Database MySQL** usato attraverso JPA/Hibernate, con volume persistente Docker
- **Docker Compose** per orchestrare e automatizzare l'avvio di tutti i componenti (frontend, backend, database)

## Struttura principale del progetto

- `frontend/` — progetto Angular, con codice sorgente, Dockerfile e configurazioni per gli ambienti (`proxy.conf.json`, `src/environments/`)
- `backend/` — progetto Spring Boot, con codice Java, Dockerfile e file di configurazione (`application.properties` o `.yml`)
- `docker-compose.yml` — file di orchestrazione multi-container per frontend, backend e database

## Prerequisiti

- Docker e Docker Compose installati e funzionanti
- (Opzionale) Java JDK 17+ se vuoi eseguire il backend in locale senza Docker
- (Opzionale) Node.js e Angular CLI per sviluppo frontend locale, ma non necessari per eseguire il progetto con Docker

## Avvio del progetto con Docker

Per costruire le immagini Docker e avviare contemporaneamente i tre container (frontend, backend, database) usa questi comandi dalla radice del progetto:

- Costruisci o aggiorna le immagini frontend e backend:

  ```bash
  docker-compose build backend frontend
  ```

- Ferma ed elimina eventuali container attivi:

  ```bash
  docker-compose down
  ```

- Avvia tutti i container in background (detached mode):

  ```bash
  docker-compose up -d
  ```

  La web app sarà disponibile su `http://localhost` (porta 80).
  I dati del database MySQL sono persistenti grazie all'uso di volumi Docker.

  Questa configurazione assicura la gestione integrata, sicura e persistente dell’intera applicazione, semplificando lo sviluppo e la distribuzione.
