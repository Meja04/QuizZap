# QuizZap - Angular Version

Il progetto nasce come esperienza di stage curricolare presso l'azienda Sync Lab S.r.l., e consiste nello sviluppo di una web app per un Trivia Quiz Game che permette agli utenti di misurare le proprie conoscenze su diverse categorie. L’applicazione è interamente client-side e sfrutta un file JSON locale per simulare domande e classifica, mentre il nome utente viene memorizzato nel browser senza richiedere autenticazione. La scelta di non implementare un back-end è stata fatta per concentrarsi sul confronto pratico tra i due framework front-end Angular e React. Il progetto è stato infatti sviluppato prima in Angular e successivamente replicato in React, seguendo lo stesso approccio per permettere una valutazione diretta delle differenze tra i due ambienti di sviluppo. La struttura stessa dell’applicazione è pensata per mettere in evidenza le caratteristiche tecniche e le potenzialità dei due framework.

## Prerequisiti

- Node.js (consigliato v18+)
- npm (consigliato v9+)
- Angular CLI (globalmente):  
  ```bash
  npm install -g @angular/cli
  ```

## Installazione

1. Clona la repository:
   ```bash
   git clone <repo-url> QuizZapAngular
   cd QuizZapAngular
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```

## Avvio in modalità sviluppo

```bash
ng serve
```

La web application è visitabile al link [http://localhost:4200](http://localhost:4200) nel browser.

## Utilizzo di json-server per simulare il backend

Per simulare le API e gestire domande e classifica viene utilizzato [json-server](https://github.com/typicode/json-server), che permette di esporre rapidamente un file JSON come API REST locale.

### Installazione di json-server

Se non l’hai già installato globalmente:
```bash
npm install -g json-server
```

### Avvio del server

All’interno della cartella del progetto, avvia json-server specificando il file JSON che contiene i dati. Il comando corretto è:

```bash
json-server --watch src\assets\db.json --port 3000
```

- Il file `db.json` deve essere presente nella cartella `src/assets/` del progetto.
- L’API sarà disponibile all’indirizzo: [http://localhost:3000](http://localhost:3000)

### Note

- Assicurarsi che il file JSON (`src/assets/db.json`) sia aggiornato e contenga sia la collezione delle domande che la classifica.
- Il file `db.json` può essere modificato anche a server avviato.
- Se si cambia la porta, è necessario aggiornare di conseguenza le chiamate API dell’applicazione.
- Il file `db.json` è il punto centrale per gestire i dati simulati dell'applicazione.

## Struttura principale del progetto

- `src/app/` — Componenti Angular e logica principale.
- `src/assets/` — Assets statici.
- `src/environments/` — Configurazioni per gli ambienti.
- `angular.json` — Configurazione del progetto Angular.
- `package.json` — Gestione dipendenze.

## Note

- Ogni branch contiene una versione **indipendente** (Angular o React).
- Se si cambia branch tra Angular e React, è necessario eliminare ogni volta `node_modules` e `package-lock.json` e reinstallare le dipendenze.
- **Alternativa consigliata:** è possibile clonare due volte la repo, una per ogni branch (una cartella per Angular e una per React), così da non dover reinstallare le dipendenze nel passaggio da una versione all'altra.
