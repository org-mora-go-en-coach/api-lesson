# api-lesson

Next.js API with lesson catalog, progress, recent-learning, and saved-state behavior. It uses Turso when configured, with an in-memory fallback for local and zero-config Hobby deployments.

- `GET /api/lessons`
- `GET /api/lessons/:id`
- `PATCH /api/lessons/:id` with `{ "progress": 45 }` or `{ "saved": true }`
- `GET /api/v1.0.2/activity`
- `GET /api/v1.0.2/lessons`
- `GET /api/v1.0.2/lessons/:id`
- `PATCH /api/v1.0.2/lessons/:id`

The unversioned `/api/*` routes remain available as compatibility aliases. New MFE releases should use the versioned routes declared in `shell-config`.
