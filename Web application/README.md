# Aplikacja webowa Stos przepełniony

* * *

**Wymagania:**

-   Node.js - <https://nodejs.org/en/>
-   Angular CLI - <https://cli.angular.io/>

**Uruchomienie:**

1.  Pobieramy zdefinowane zależności dla projektu wpisują:

        npm install

2.  Uruchamiamy aplikacje wpisując:

        ng serve

Aplikacja staruje na porcie 4200 - <http://localhost:4200>.
Aplikacja komunikuje się z naszym serwerem Node.js więc uruchomienie go oraz stworzenie bazy danych jest również wymagane.

**Uruchomienie serwera i stworzenie bazy danych:**

Nasz serwer znajduje sie w katalogu /Server :smile:. Przechodzimy więc do niego i kolejno uruchamiamy:

1.  Pobieramy zdefinowane zależności dla serwera wpisują:

        npm install

2.  Uruchamiamy serwer wpisując:

        node server.js

    Adres serwera to: http://localhost:3000

3.  Aby zbudować/zresetować bazę danych i jej tabele:

        node jobs/database.js

4.  Aby załadować przykładowe dane:

        node jobs/seed.js
