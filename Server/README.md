# REST Serwer dla aplikacji Stos Przepełniony
---
__Wymagania:__
+ Node.js

__Uruchomienie:__
  1. Pobieramy zdefinowane zależności dla projektu wpisują:
    ```
    npm install
    ```
  2. Uruchamiamy serwer wpisując:
    ```
    node server.js
    ```

Serwer staruje na porcie 3000 - http://localhost:3000.

__Baza danych:__

Aby zbudować bazę danych z istniejących modeli uruchamiamy:
```
node jobs/database.js
```

__Dane:__

Aby załadowac przykładowe dane do bazy danych uruchamiamy:
```
node jobs/seed.js
```

__Struktura projektu:__
``` javascript
// Pliki konfiguracyjne bibliotek oraz serwera.
/config

// Logika dla obsługi przychodzących rządań do aplikacji.
/controllers

// Pliki które wykonują zadania stałe.
/jobs

// Model z których tworzone są tabele bazy danych.
/models
  ...
  // Plik zawiera wszystkie modele oraz relacje między nimi, z niego korzystamy w kontrolerach.
  index.js

// Pliki które ładują dane do bazy danych.
/seeders

// Główny plik który startuje serwer.
server.js

// Ścieżki łączące API aplikacji z logiką odpowiednich kontrolerów.
routes.js
```

__Zasady:__
* Nie używamy średników.
* Długość wcięcia (tab) to 2 spacje.
