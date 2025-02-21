
import Link from 'next/link';
function NotFound() {
    return (

        <div className='w-full min-h-screen flex-col  justify-center items-center py-1 space-y-1 mt-[85px] mb-1 bg-[var(--secondry-color)]'>
            <h2>Not Found</h2>
            <p>We can not find the page you are looking for.</p>
            <p>Sorry for the inconvenience.</p>
            <Link className=' py-2 px-4 bg-red-700 ' href="/">Go Home</Link>
        </div>
    )
}

export default NotFound
