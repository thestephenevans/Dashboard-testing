import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
import Card from "@/app/ui/dashboard/card";
import Link from "next/link";


export default async function Page(){
    let rows = [];
    try {
        const result = await sql`SELECT value, completed FROM list`;
        rows = result.rows;
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
                            <form>
                                <label htmlFor="to-do" className="text-white">Add Todo</label>
                                <input 
                                    id = "user-input"
                                    type="text" 
                                    name="to-do" 
                                    className="block w-full px-4 py-2 border" 
                                />
                                <Link href = {`/api/add-task?taskValue=NEW-TASK`}>
                                    <button 
                                        type="submit" 
                                        className="block w-full px-4 py-2 mt-2 text-white bg-blue-500 hover:bg-blue-600"
                                    >
                                        Add
                                    </button>
                                </Link>
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
                                <li key={crypto.randomUUID}>
                                    <Card color={row.completed? 'bg-blue-400' : 'bg-gray-200'}>
                                        <div className="flex flex-row justify-between">
                                            <div className="w-5/12">
                                                <Card color='bg-blue-400'>
                                                    {row.value}
                                                    <button>
                                                        Delete
                                                    </button>
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