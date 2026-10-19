import { createClient, type Client } from "@libsql/client";
export type Lesson = {
  id: string;
  title: string;
  level: string;
  durationMinutes: number;
  progress: number;
  summary: string;
  saved: boolean;
  lastStudiedAt: string | null;
};
type LessonState = {
  progress: number;
  saved: boolean;
  lastStudiedAt: string | null;
};
const catalog = [
  {
    id: "daily-introductions",
    title: "자신 있게 소개하기",
    level: "A1",
    durationMinutes: 12,
    summary: "직장과 일상에서 자연스럽게 자신을 소개해 보세요.",
  },
  {
    id: "asking-followups",
    title: "후속 질문 잘하기",
    level: "A2",
    durationMinutes: 18,
    summary: "유용한 후속 질문으로 대화를 자연스럽게 이어가세요.",
  },
  {
    id: "clear-opinions",
    title: "명확하게 의견 말하기",
    level: "B1",
    durationMinutes: 22,
    summary: "의견을 구조화하고 간결한 예시로 뒷받침해 보세요.",
  },
];
const initial: Record<string, LessonState> = {
  "daily-introductions": {
    progress: 80,
    saved: false,
    lastStudiedAt: "2026-10-16T09:30:00.000Z",
  },
  "asking-followups": {
    progress: 35,
    saved: false,
    lastStudiedAt: "2026-10-15T12:10:00.000Z",
  },
  "clear-opinions": { progress: 0, saved: true, lastStudiedAt: null },
};
const memory = new Map(Object.entries(initial));
let client: Client | null = null;
let ready: Promise<void> | null = null;
function db() {
  if (!process.env.TURSO_DATABASE_URL) return null;
  client ??= createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  ready ??= client
    .execute(
      "CREATE TABLE IF NOT EXISTS lesson_activity (lesson_id TEXT PRIMARY KEY, progress INTEGER NOT NULL DEFAULT 0, saved INTEGER NOT NULL DEFAULT 0, last_studied_at TEXT)",
    )
    .then(() => undefined);
  return client;
}
function combine(id: string, state?: LessonState): Lesson | undefined {
  const base = catalog.find((item) => item.id === id);
  if (!base) return;
  const resolved = state ??
    initial[id] ?? { progress: 0, saved: false, lastStudiedAt: null };
  return { ...base, ...resolved };
}
async function readState(id: string): Promise<LessonState | undefined> {
  const c = db();
  if (!c) return memory.get(id);
  await ready;
  const result = await c.execute({
    sql: "SELECT progress,saved,last_studied_at FROM lesson_activity WHERE lesson_id=?",
    args: [id],
  });
  const row = result.rows[0];
  return row
    ? {
        progress: Number(row.progress),
        saved: Boolean(row.saved),
        lastStudiedAt: row.last_studied_at ? String(row.last_studied_at) : null,
      }
    : initial[id];
}
export async function listLessons(): Promise<Lesson[]> {
  return Promise.all(
    catalog.map(async (item) => combine(item.id, await readState(item.id))!),
  );
}
export async function findLesson(id: string): Promise<Lesson | undefined> {
  return combine(id, await readState(id));
}
export async function updateLessonState(
  id: string,
  input: { progress?: number; saved?: boolean },
): Promise<Lesson | undefined> {
  if (!catalog.some((item) => item.id === id)) return;
  const current = (await readState(id)) ?? {
    progress: 0,
    saved: false,
    lastStudiedAt: null,
  };
  const next: LessonState = {
    progress: input.progress ?? current.progress,
    saved: input.saved ?? current.saved,
    lastStudiedAt:
      input.progress === undefined
        ? current.lastStudiedAt
        : new Date().toISOString(),
  };
  const c = db();
  if (!c) memory.set(id, next);
  else {
    await ready;
    await c.execute({
      sql: "INSERT INTO lesson_activity(lesson_id,progress,saved,last_studied_at) VALUES(?,?,?,?) ON CONFLICT(lesson_id) DO UPDATE SET progress=excluded.progress,saved=excluded.saved,last_studied_at=excluded.last_studied_at",
      args: [id, next.progress, next.saved ? 1 : 0, next.lastStudiedAt],
    });
  }
  return combine(id, next);
}
