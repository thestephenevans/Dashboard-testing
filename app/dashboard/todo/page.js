import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
//import React, { useState, useEffect } from "react";
import Card from "@/app/ui/dashboard/card";

const handleSubmit = async (event) => {
    'use server'
    event.preventDefault();
    
    const inputValue = event.target.querySelector('input').value;

    if(inputValue.trim() !== ''){
        await sql`INSERT INTO LIST (id, value, completed) VALUES (${crypto.randomUUID()}, ${inputValue}, ${false})`;
        event.target.querySelector('input').value = '';
    }
};


export default async function Page(){
    //const [list, setList] = useState([]);
    //const [input, setInput] = useState('');

    try {
        const { rows } = await sql`SELECT * from LIST`;
        console.log(rows);
    } catch (error) {
        console.error('Error selecting rows from LIST table:', error.message);
    }

    /*useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedList = JSON.parse(localStorage.getItem('todo-list'));
            if (storedList) {
                setList(storedList);
                console.log(list);
            }
        }
    }, []); */

    /*useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('todo-list', JSON.stringify(list));
            console.log(list);
        }
    }, [list]);*/

    return(
        <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text">Todo List</h1>
            <Card>
                <div className="flex flex-row justify-between">
                    <div className="w-5/12">
                        <Card color='bg-blue-400'>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="to-do" className="text-white">Add Todo</label>
                                <input 
                                    //value={input} 
                                    type="text" 
                                    name="to-do" 
                                    className="block w-full px-4 py-2 border" 
                                />
                                <button 
                                    type="submit" 
                                    className="block w-full px-4 py-2 mt-2 text-white bg-blue-500 hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </form>
                        </Card>
                    </div>
                    <div className="w-6/12 rounded bg-white p-5">
                        {/*list.length > 0 ? 
                            <h2 className="text-2xl font-bold mt-5">To Do:</h2> 
                        : 
                            <span>No Items Listed</span> */
                        }

                        <ul className="list-none pl-0 flex flex-col gap-3">
                            {rows && rows.map(row => (
                                <li key={row.id}>
                                    <Card color={row.completed? 'bg-blue-400' : 'bg-gray-200'}>
                                        <div className="flex flex-row justify-between">
                                            <div className="w-5/12">
                                                <Card color='bg-blue-400'>
                                                    {row.value}
                                                </Card>
                                            </div>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}