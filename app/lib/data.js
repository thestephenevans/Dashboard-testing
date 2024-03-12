import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCustomers() {
  noStore();

  try {
    const data = await sql`SELECT * FROM customers`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}