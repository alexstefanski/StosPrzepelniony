# REST Serwer dla aplikacji Stos Przepełniony - TODO

* * *

**User/User**

Autor: _Jakub_

|      | Nazwa API                              | Adres API                                       |
| ---- | -------------------------------------- | ----------------------------------------------- |
| :ok: | Rejestracja                            | /users/register                                 |
| :ok: | Potwierdzenie Rejestracji              | /users/:userId/register/confirm/:tokenId/:token |
| :ok: | Dostępność e-mail                      | /users/checkemail/                              |
| :ok: | Ponowne wysłanie e-mail weryfikującego | /users/resendverificationemail/                 |
| :ok: | Logowanie                              | /users/login/                                   |
| :ok: | Czy zalogowany                         | /users/isloggedin/                              |
| :ok: | Wyloguj                                | /users/logout/                                  |
|      | Odzyskiwanie Hasła                     | /users/resetpassword/                           |
| :ok: | Informacje o koncie                    | /users/:userId/info                             |
| :ok: | Zmiana hasła                           | /users/:userId/changepassword                   |

**User/Category**

Autor: _Piotr_

|     | Nazwa API | Adres API        |
| --- | --------- | ---------------- |
|     | Lista     | /categories/list |

**User/Ad**

Autor: _Piotr_

|     | Nazwa API               | Adres API         |
| --- | ----------------------- | ----------------- |
|     | Lista                   | /ads/list         |
|     | Pokaż ogłoszenie        | /ads/:adId/info   |
|     | Dodaj ogłoszenie        | /ads/add          |
|     | Edytuj ogłoszenie       | /ads/:adId/edit   |
|     | Zmień status ogłoszenia | /ads/:adId/status |
|     | Usuń ogłoszenie         | /ads/:adId/delete |

**User/Message**

Autor: _Maciej M._

|      | Nazwa API            | Adres API                          |
| ---- | -------------------- | ---------------------------------- |
| :ok: | Lista wiadomości     | /messages/list                     |
| :ok: | Pokaż wiadomość      | /messages/:adId/:userIdSender      |
| :ok: | Wysyłanie wiadomości | /messages/:adId/:userIdSender/send |

**Admin/Admin**

Autor: _Bartosz_

|     | Nazwa API                | Adres API               |
| --- | ------------------------ | ----------------------- |
|     | Lista administratorów    | /admins/list            |
|     | Szczegóły administratora | /admins/:adminId/info   |
|     | Dodaj administratora     | /admins/add             |
|     | Edytuj administratora    | /admins/:adminId/edit   |
|     | Usuń administratora      | /admins/:adminId/delete |
|     | Czy admin                | /admins/:userId/isadmin |

**Admin/Category**

Autor: _Maciej M._

|      | Nazwa API        | Adres API                      |
| ---- | ---------------- | ------------------------------ |
| :ok: | Lista kategorii  | /categories/list               |
| :ok: | Dodaj kategorię  | /categories/add                |
| :ok: | Edytuj kategorię | /categories/:categoryId/edit   |
| :ok: | Usuń kategorię   | /categories/:categoryId/delete |

**Admin/User**

Autor: _Bartosz_

|     | Nazwa API                  | Adres API             |
| --- | -------------------------- | --------------------- |
|     | Lista użytkowników         | /users/list           |
|     | Zmiana statusu użytkownika | /users/:userId/status |
|     | Usuń użytkownika           | /users/:userId/delete |

**Admin/Ad**

Autor: _Bartosz_

|     | Nazwa API                 | Adres API         |
| --- | ------------------------- | ----------------- |
|     | Lista ogłoszeń            | /ads/list         |
|     | Zmiana statusu ogłoszenia | /ads/:adId/status |
|     | Usuń użytkownika          | /ads/:adId/delete |

**Admin/Permission**

Autor: _Paweł W._

|      | Nazwa API           | Adres API                         |
| ---- | ------------------- | --------------------------------- |
| :ok: | Lista typów dostępu | /permissions/list                 |
| :ok: | Pokaż typ dostępu   | /permissions/:permissionId/info   |
| :ok: | Dodaj typ dostępu   | /permissions/add                  |
| :ok: | Edytuj typ dostępu  | /permissions/:permissionId/edit   |
| :ok: | Usuń typ dostępu    | /permissions/:permissionId/delete |

**Admin/Action**

Autor: _Paweł W._

|      | Nazwa API   | Adres API               |
| ---- | ----------- | ----------------------- |
| :ok: | Lista akcji | /actions/list           |
| :ok: | Pokaż akcję | /actions/:actionId/info |

Gotowe API oznacza, że:

-   Posiada utworzony odpowiedni model. Generuje tabelę dla modelu w bazie danych.

    Model zdefiniowany zgodnie z diagramem klas. Aby generować tabelę należy dołączyć model do pliku jobs/database.js

-   Model posiada zdefiniowane relacje między innymi modelami.

    To jest istotne jedynie gdy korzystamy z mechnizmów biblioteki Sequelize do operacji na danych. Relacje między modelami definiujemy w pliku models/index.js

-   Spełnia wymogi specyfikacji.

-   Wysyła stosowne komunikaty w formacie JSON w przypadku błędów lub sukcesu.

    Odpowiedzi wysyłamy jedynie w tedy gdy jest to konieczne. W przypadku błędów powinniśmy wysyłać je zawsze. Wysyłmy również odpowiedzi np. po zapisaniu obiektu do bazy, jego edycji lub usunięciu.

    Format przykładowej odpowiedzi dla błędu to:

    ```javascript
    {
        // Uniwersalne pole dla odpowiedzi. Najczęściej te wiadomości są wyświetlane nad formularzami.
        messages: ['Rejestracja nie powiodła się.', 'Popraw zaznaczone pola.'],

        // Kolejne nazwy pól które otrzymaliśmy w rządaniu i których walidacja sie nie powiodła.
        email: ['Ten adres e-mail już istnieje.'],

        password: ['Hasło jest zbyt krótkie.']
    }
    ```

    Format przykładowej odpowiedzi dla sukcesu to:

    ```javascript
    {
        // Uniwersalne pole dla odpowiedzi. Najczęściej te wiadomości są wyświetlane nad formularzami.
        messages: ['Użytkownik zarejestrowany.', 'Potwierdź rejestrację weryfikując konto linkiem wysłanym na podany adres e-mail.']
    }
    ```
