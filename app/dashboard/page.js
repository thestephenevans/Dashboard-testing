import Card from "@/app/ui/dashboard/card";
import { fetchCustomers } from "@/app/lib/data";
import { createCustomer } from "@/app/lib/actions";
import { deleteCustomer } from '@/app/lib/actions';

function DeleteCustomer({username}){
    const deleteCustomerWithId = deleteCustomer.bind(null, username);

    return(
        <form action={deleteCustomerWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                Delete
            </button>
        </form>
    )
}

export default async function Page() {
    const customers = await fetchCustomers();
    console.log(customers);
    return(
        <>
            <div className="flex flex-col gap-10">
                <div className="">
                    <h2 className="text-3xl">Add Customer</h2>
                    <form action={createCustomer} className="flex flex-col g-5 w-48 mt-5"> 
                        <label htmlFor="username">Customer Username:</label>
                        <input type = "text" name = "username" className="border" />
                        <label htmlFor="username">Customer id:</label>
                        <input type = "text" name = "customerId" className="border" />
                        <button type = "submit" className="bg-blue-400 p-3 rounded-xl mt-5">Submit</button>
                    </form>   
                </div>
                
                <div className="bg-slate-200 p-10 rounded-3xl">
                    <h1 className="text-3xl leading-9 tracking-tight text mb-5">Customers</h1>
                    <div className="flex flex-col gap-5 w-6/12">
                        {customers.map((customer, i) => (
                            <div key={i}>
                                <div className="p-5 bg-white border border-gray-500 rounded-xl text-black">
                                    {customer.username}
                                    <DeleteCustomer/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}