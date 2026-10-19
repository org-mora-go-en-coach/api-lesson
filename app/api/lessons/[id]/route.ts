import { NextResponse } from "next/server";
import { findLesson, updateLessonState } from "../../../../src/4-entity/lesson";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const lesson = await findLesson(id);
  return lesson
    ? NextResponse.json({ lesson })
    : NextResponse.json({ error: "강의를 찾을 수 없습니다." }, { status: 404 });
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "올바른 JSON 형식이 아닙니다." },
      { status: 400 },
    );
  }
  const input = body as Record<string, unknown>;
  if (
    input.progress !== undefined &&
    (typeof input.progress !== "number" ||
      input.progress < 0 ||
      input.progress > 100)
  )
    return NextResponse.json(
      { error: "진도는 0에서 100 사이여야 합니다." },
      { status: 400 },
    );
  if (input.saved !== undefined && typeof input.saved !== "boolean")
    return NextResponse.json(
      { error: "저장 여부는 불리언 값이어야 합니다." },
      { status: 400 },
    );
  const lesson = await updateLessonState(id, {
    progress: input.progress as number | undefined,
    saved: input.saved as boolean | undefined,
  });
  return lesson
    ? NextResponse.json({ lesson })
    : NextResponse.json({ error: "강의를 찾을 수 없습니다." }, { status: 404 });
}
export function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
