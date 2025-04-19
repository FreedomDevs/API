# API Documentation
### API Version 0.0.1

## Общая информация

- Base URL: `/`
- Все ответы возвращаются в формате JSON
- Аутентификация: JWT токен в заголовке `Authorization: Bearer <token>`

## Модуль Auth

### Регистрация пользователя

```http
POST /auth/register
```

Тело запроса:
```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

Ответ (200):
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "avatar": "null | string",
  "skinUrl": "null | string",
  "skinType": true,
  "createdAt": "string",
  "updatedAt": "string",
  "roles": [
    "USER"
  ]
}
```

### Авторизация

```http
POST /auth/login
```

Тело запроса:
```json
{
  "name": "string",
  "password": "string"
}
```

Ответ (200):
```json
{
  "accessToken": "string"
}
```


## Модуль Users

### Получение пользователя

```http
GET /user/:idOrEmail
```

Параметры пути:
- `idOrEmail` - UUID, email или name пользователя

Ответ (200):
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "avatar": "null | string",
  "skinUrl": "null | string",
  "skinType": true,
  "createdAt": "string",
  "updatedAt": "string",
  "roles": [
    "USER"
  ]
}
```

### Создание пользователя

```http
POST /user
```

Тело запроса:
```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

Ответ (200):
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "avatar": "null | string",
  "skinUrl": "null | string",
  "skinType": true,
  "createdAt": "string",
  "updatedAt": "string",
  "roles": [
    "USER"
  ]
}
```

### Удаление пользователя

```http
DELETE /user/:id
```

Параметры пути:
- `id` - UUID пользователя

## Коды ошибок

- 400 Bad Request - Неверный формат запроса
- 401 Unauthorized - Требуется авторизация
- 403 Forbidden - Недостаточно прав
- 404 Not Found - Ресурс не найден

## Примеры ошибок

Неверные учетные данные:
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

Ошибка валидации:
```json
{
  "statusCode": 400,
  "message": ["password must be longer than or equal to 6 characters"],
  "error": "Bad Request"
}
```
