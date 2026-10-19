import { NextResponse } from "next/server";
import { listLessons } from "../../../src/4-entity/lesson";
export async function GET() {
  const lessons = await listLessons();
  return NextResponse.json({
    history: lessons
      .filter((item) => item.lastStudiedAt)
      .sort((a, b) =>
        String(b.lastStudiedAt).localeCompare(String(a.lastStudiedAt)),
      ),
    saved: lessons.filter((item) => item.saved),
    version: "1.0.2",
  });
}
export function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
