# api-lesson

Next.js API with lesson catalog, progress, recent-learning, and saved-state behavior. It uses Turso when configured, with an in-memory fallback for local and zero-config Hobby deployments.

- `GET /api/lessons`
- `GET /api/lessons/:id`
- `PATCH /api/lessons/:id` with `{ "progress": 45 }` or `{ "saved": true }`
- `GET /api/activity`

