
import Link from 'next/link';
function NotFound() {
    return (

        <div className='w-full min-h-screen flex-col  justify-center items-center py-1 space-y-1 mt-[85px] mb-1 bg-[var(--secondry-color)]'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className=' py-2 px-4 bg-red-700 ' href="/">Go Home</Link>
        </div>
    )
}

export default NotFound
