'use server'
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const taskValue = searchParams.get('taskValue');
   
    try {
        if (!taskValue) throw new Error('Value required');
        await sql`DELETE FROM LIST WHERE value = ${taskValue}`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
     
    const tasks = await sql`SELECT * FROM LIST;`;
    return NextResponse.json({ tasks }, { status: 200 });
}