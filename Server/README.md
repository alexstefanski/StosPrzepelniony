# REST Serwer dla aplikacji Stos Przepełniony

* * *

**Wymagania:**

-   Node.js - <https://nodejs.org/en/>

**Uruchomienie:**

1.  Pobieramy zdefinowane zależności dla projektu wpisują:

        npm install

2.  Uruchamiamy serwer wpisując:

        node server.js

Serwer staruje na porcie 3000 - <http://localhost:3000>.

**Baza danych:**

Aby zbudować bazę danych z istniejących modeli uruchamiamy:

    node jobs/database.js

**Dane:**

Aby załadowac przykładowe dane do bazy danych uruchamiamy:

    node jobs/seed.js

**Struktura projektu:**

```javascript
// Pliki konfiguracyjne bibliotek oraz serwera.
/config

// Logika dla obsługi przychodzących rządań do aplikacji.
/controllers

// Pliki które wykonują zadania stałe.
/jobs

// Middleware wspólne dla całego serwera.
/middlewares
    // Autetyfikuje użytkownika.
    autheticatedUser.js

    // Sprawdza czy użytkownik jest administratorem.
    isAdministrator.js

    // Sprawdza czy użytkownik ma odstęp do akcji o danym id.
    isAllowed.js

// Model z których tworzone są tabele bazy danych.
/models
    // Plik zawiera wszystkie modele oraz relacje między nimi, z niego korzystamy w kontrolerach.
    index.js

// Pliki które ładują dane do bazy danych.
/seeders

// Główny plik który startuje serwer.
/server.js

// Ścieżki łączące API aplikacji z logiką odpowiednich kontrolerów.
/routes.js
```

**Zasady:**

-   Nie używamy średników.
-   Długość wcięcia (tab) to 2 spacje.
