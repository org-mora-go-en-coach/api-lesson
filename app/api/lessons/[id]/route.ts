import { NextResponse } from "next/server"; import { lessons } from "../../../../lib/lessons";
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params; const lesson=lessons.find(item=>item.id===id); return lesson?NextResponse.json({lesson}):NextResponse.json({error:"Lesson not found"},{status:404})}

