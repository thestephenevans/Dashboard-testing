import Link from "next/link";

export default function Menu(){
    const navigationitems = 
    [
        {text: 'Home', link: '/'}, 
        {text: 'Dashboard', link: '/dashboard'}, 
        {text: 'ToDo List', link: '/dashboard/todo'}
    ]

    return(
        <div className="h-full">
            <ul className="flex flex-col gap-2">
                {navigationitems.map(item => (
                    <Link href={item.link} key={item.text}>
                        <li className="p-5 font-bold active:bg-blue-600 hover:bg-blue-600">
                            {item.text}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>   
    )
}