import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return(
    <section className="bg-[var(--primary-color)] z-50 flex justify-center items-center fixed top-0 left-0 bottom-0 right-0  border-0 border-solid border-violet-800 ">
      
       <SignUp />

</section> 
  )
}