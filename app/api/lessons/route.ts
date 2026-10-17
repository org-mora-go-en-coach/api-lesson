import { NextResponse } from "next/server"; import { listLessons } from "../../../lib/lessons";
export async function GET(){const lessons=await listLessons();return NextResponse.json({lessons,total:lessons.length,version:"1.0.1"})}
export function OPTIONS(){return new NextResponse(null,{status:204})}

