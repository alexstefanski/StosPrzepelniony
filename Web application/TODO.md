# Aplikacja webowa Stos przepełniony - TODO

* * *

**User**

Autor: _Jakub_

|      | Lokalizacja komponentu  | Ścieżka w aplikacji |
| ---- | ----------------------- | ------------------- |
| :ok: | user/login              | /login              |
| :ok: | user/register           | /register           |
| :ok: | user/resend-email       | /resend-email       |
| :ok: | user/logout             | /logout             |
| :ok: | user/forgotten-password | /forgotten-password |
| :ok: | user/me                 | /me                 |
| :ok: | user/change-password    | /change-password    |

**Ad**

Autor: _Maciej G._

|      | Lokalizacja komponentu | Ścieżka w aplikacji     |
| ---  | ---------------------- | ----------------------- |
|      | ad/index               | /ads                    |
| :ok: | ad/show                | /ad/:adId               |
| :ok: | ad/add                 | /ad/add                 |
| :ok: | ad/edit                | /ad/:adId/edit          |
| :ok: | ad/change-status       | /ad/:adId/change-status |
| :ok: | ad/delete              | /ad/:adId/delete        |

**Message**

Autor: _Paweł K._

|     | Lokalizacja komponentu | Ścieżka w aplikacji |
| --- | ---------------------- | ------------------- |
|     | message/index          | /messages           |
|     | mesage/show            | /message/:messageId |
|     | mesage/send            | /message/send       |

**Admin/Admin**

Autor: _Paweł K._

|     | Lokalizacja komponentu | Ścieżka w aplikacji           |
| --- | ---------------------- | ----------------------------- |
|     | admin/admin/index      | /admin/admins                 |
|     | admin/admin/show       | /admin/admins/:adminId        |
|     | admin/admin/add        | /admin/admins/add             |
|     | admin/admin/edit       | /admin/admins/:adminId/edit   |
|     | admin/admin/delete     | /admin/admins/:adminId/delete |

**Admin/Category**

Autor: _Natalia_

|     | Lokalizacja komponentu | Ścieżka w aplikacji                |
| --- | ---------------------- | ---------------------------------- |
| :ok:| admin/category/index   | /admin/categories                  |
| :ok:| admin/category/add     | /admin/category/add                |
| :ok:| admin/category/edit    | /admin/category/:categoryId/edit   |
| :ok:| admin/category/delete  | /admin/category/:categoryId/delete |

**Admin/User**

Autor: _Natalia_

|     | Lokalizacja komponentu | Ścieżka w aplikacji |
| --- | ---------------------- | ------------------- |
|     | admin/user/index       | /admin/users        |
|     | admin/user/delete      | /admin/users/delete |

**Admin/Ad**

Autor: _Rafał_

|     | Lokalizacja komponentu | Ścieżka w aplikacji    |
| --- | ---------------------- | ---------------------- |
|     | admin/ad/index         | /admin/ads             |
|     | admin/ad/delete        | /admin/ad/:adId/delete |

**Admin/Permission**

Autor: _Rafał_

|      | Lokalizacja komponentu  | Ścieżka w aplikacji                    |
| -----| ----------------------- | -------------------------------------- |
| :ok: | admin/permission/index  | /admin/permissions                     |
|      | admin/permission/show   | /admin/permission/:permissionId        |
| :ok: | admin/permission/add    | /admin/permission/add                  |
|      | admin/permission/edit   | /admin/permssion/:permissionId/edit    |
| :ok: | admin/permission/delete | /admin/permission/:permissionId/delete |

Root dla lokalizacji komponentu to:

    src/app

Gotowy komponent oznacza, że:

-   Wygląd i treści są spójne i gotowe na pozanie światu.

-   Zadanie jakie ma wykonywać jest wykonywane.

     Jeżeli jest problem z funkcjonalnością ze względu na błędy po stronie serwera np. problemy z pobieraniem, zapisywaniem, edycją danych itp... zwracajmy się bezpośrednio do osób odpowiedzialnych za daną część serwera, zgłośmy im problem i poczekajmy na poprawki z ich strony.
