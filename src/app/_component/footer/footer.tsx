


import React from 'react'

 function Footer() {
   
  return (
    <div>
        
        {/* <footer className="bg-white h-[80px] border border-solid border-black"> */}
        <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-0 sm:px-6 lg:px-8 lg:pt-0 bg-[var(--primary-color)] border-0 border-solid border-red-600">
          

            <div className="mt-0 border-t border-gray-100 pt-6">
            <div className="flex justify-between text-center sm:flex-col sm:items-center sm:justify-between sm:text-left">
                
                <p className="py-5 text-lg text-[var(--secondary-color)] sm:order-first sm:mt-0">
                    &copy; 2024 Company Name
                </p>
                <p className="sm:flex-col sm:items-center py-5 flex justify-between text-lg text-[var(--secondary-color)]">
                    <span className="block sm:inline">All rights reserved.</span>
                    <a
                        className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                        href="#"
                    >
                        Terms & Conditions
                    </a>

                    <span className='hidden lg:block xl:block sx:block' >&middot;</span>

                    <a
                        className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                        href="#"
                    >
                        Privacy Policy
                </a>
                </p>

                
            </div>
            </div>
        </div>
        {/* </footer> */}

    </div>
  )
}

export default Footer

