![](/public/og.jpg)

# Вдохновлено приложением Notion

![](/public/readme-banner.png)

## Цель

Сделать реактивное приложение для заметок

## Решённые задачи

- Адаптивная вёрстка
- Доступность с клавиатуры
- SEO
- Optimistic Updates
- REST API
- Валидация запросов к серверу
- Взаимодействие с БД
- Деплой на Versel + Postgres на Railway

## Запуск

```sh
npm install

echo DATABASE_URL=your_path_to_postgres_db >> .env
prisma generate
prisma db push

npm run dev
```
