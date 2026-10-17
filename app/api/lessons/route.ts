import { NextResponse } from "next/server"; import { lessons } from "../../../lib/lessons";
export function GET(){return NextResponse.json({lessons,total:lessons.length,version:"1.0.0"})}
export function OPTIONS(){return new NextResponse(null,{status:204})}

