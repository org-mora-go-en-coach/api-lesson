import { NextResponse } from "next/server";
import { listLessons } from "../../../src/4-entity/lesson";
export async function GET() {
  const lessons = await listLessons();
  return NextResponse.json({
    lessons,
    total: lessons.length,
    version: "1.0.2",
  });
}
export function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
