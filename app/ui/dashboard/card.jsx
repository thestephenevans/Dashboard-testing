export default function Card({children, color}){
    return(
        <>
            <div className={`${color} rounded-md p-5`}>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}