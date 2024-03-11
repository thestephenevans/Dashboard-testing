"use client"

import React, { useState, useEffect } from "react";
import Card from "@/app/ui/dashboard/card";

export default function Page(){
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedList = JSON.parse(localStorage.getItem('todo-list'));
            if (storedList) {
                setList(storedList);
                console.log(list);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('todo-list', JSON.stringify(list));
            console.log(list);
        }
    }, [list]);

    function handleSubmit(e){
        e.preventDefault();
        const newItem = { id: crypto.randomUUID(), value: input, completed: false };
        setList([...list, newItem]);
        setInput('');
    }

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
                                    value={input} 
                                    type="text" 
                                    name="to-do" 
                                    className="block w-full px-4 py-2 border" 
                                    onChange={(e) => setInput(e.target.value)} 
                                />
                                <button type="submit" className="block w-full px-4 py-2 mt-2 text-white bg-blue-500 hover:bg-blue-600">Add</button>
                            </form>
                        </Card>
                    </div>
                    <div className="w-6/12 rounded bg-white p-5">
                        {list.length > 0 ? 
                            <h2 className="text-2xl font-bold mt-5">To Do:</h2> 
                        : 
                            <span>No Items Listed</span>
                        }

                        <ul className="list-none pl-0 flex flex-col gap-3">
                            {list && list.map((item, index) => (
                            <li key={index} className="flex flex-row gap-2 align-center">
                                <input 
                                    type="checkbox" 
                                    checked={item.completed} 
                                    onChange={(e) => {setList(list.map((i) => (i.id === item.id? {...i, completed: e.target.checked} : i)))}} 
                                />
                                {item.completed === true ? 
                                    <span className="text-green-600 font-bold">{item.value}</span> 
                                : 
                                    <span className="text-black font-bold">{item.value}</span>
                                }
                                <button 
                                    onClick={() => {setList(list.filter((i) => (i.id !== item.id)))}}
                                >
                                    Delete
                                </button>
                            </li>   
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}