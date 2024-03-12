'use client'

import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
import Card from "@/app/ui/dashboard/card";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Page(){
    const [todoList, setTodoList] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [input, setInput] = useState('');
    const [showingCompleted, setShowingCompleted] = useState(false);

    // Load todo list from local storage when component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedList = localStorage.getItem('todoList');
            if (storedList) {
                setTodoList(JSON.parse(storedList));
                setOriginalList(JSON.parse(storedList));
            }
        }else{
            console.log('error')
        }
    }, []); // Empty dependency array to run this effect only once when component mounts

    // Function to update local storage and state with new list
    function updateList(newList) {
        localStorage.setItem('todoList', JSON.stringify(newList));
        setTodoList(newList);
    }

    function addTodo(todo) {
        setInput(todo);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const newTodo = { id: Date.now(), value: input, category: '', completed: false };
        updateList([...todoList, newTodo]);
        setInput('');  
    }

    function handleDelete(id) {
        const updatedList = todoList.filter(todo => todo.id !== id);
        updateList(updatedList);
    }

    function handleCompleted(id, completed) {
        const updatedList = todoList.map(todo => {
            if (todo.id === id) {
                todo.completed = completed;
            }
            return todo;
        });
        updateList(updatedList);
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
                                    id = "user-input"
                                    value={input}
                                    type="text" 
                                    name="to-do" 
                                    className="block w-full px-4 py-2 border" 
                                    onChange={(e) => setInput(e.target.value)}
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
                        {todoList.length > 0 ? 
                            <h2 className="text-2xl font-bold mt-2 mb-5">To Do:</h2> 
                        : 
                            <span>No Items Listed</span>
                        }

                        <ul className="list-none pl-0 flex flex-col gap-3">
                            {todoList.map(item => (
                                <li key={item.id}>
                                    <Card color={item.completed? 'bg-green-500' : 'bg-gray-200'}>
                                        <div className="flex flex-row justify-between align-center gap-2">
                                            <input type = "checkbox" checked={item.completed} onChange={e => handleCompleted(item.id, e.target.checked)}/>
                                            <div className="flex flex-row align-center justify-between w-full">                   
                                                {item.value}
                                                <button onClick={() => handleDelete(item.id)}>
                                                    Delete
                                                </button>                         
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