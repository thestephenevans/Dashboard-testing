'use server'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { StringLiteral } from 'typescript';
import { z } from 'zod';

export type Customer = {
    username: string,
    customer_id: string;
};

const FormSchema = z.object({
    username: z.string(),
    customerId: z.string(),
  });
   
const CreateCustomer = FormSchema.omit({});


export async function createCustomer(formData: FormData){
    const {username, customerId} = CreateCustomer.parse({
        username: formData.get('username'),
        customerId: formData.get('customerId'),
    });

    await sql`
    INSERT INTO Customers (User_id, Username)
    VALUES (${customerId}, ${username})
  `;

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteCustomer(customerUsername: string) {
    await sql`DELETE FROM customers WHERE Username = ${customerUsername}`;
    revalidatePath('/dashboard');
}