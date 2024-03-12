'use server'
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache';


export async function GET(request, result) {
    noStore();
    const { searchParams } = new URL(request.url);
    const taskValue = searchParams.get('taskValue');
   
    try {
        if (!taskValue) throw new Error('Value required');
        await sql`INSERT INTO LIST (value, completed) VALUES (${taskValue}, false)`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
     
    const tasks = await sql`SELECT * FROM LIST;`;
    redirect('/dashboard/todo');
    return NextResponse.json({ tasks }, { status: 200 });
}