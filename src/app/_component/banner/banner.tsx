


import { typeProduct } from '@/app/util/type/type';
// import { axiosGet } from '@/app/util/fetchApi/axiosGet';

import BodyBanner from './bodybanner';
import NavBarController from './navBarController';

const getProducts = async () => {

  try {

    const res = await fetch
      (`${process.env.NEXT_PUBLIC_API_URL}/products?populate[images][populate]=*`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }

        })

    if (!res.ok) {
      throw new Error(`Http status : ${res.status}`)
    }

    const data = await res.json()
    const products: typeProduct[] = data.data

    return products

  } catch (error) {
    console.log(error)
  }




}

async function Banner() {

  const products = await getProducts();


  return (
    <div className='min-h-screen box-border ' >
      <NavBarController />
      <section className="h-full bg-slate-700  text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl"
            >

              Digital Commerce
              <span className="sm:block"> Online Shopping </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">

              Home Delivery
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <div className='border-0 border-solid border-red-800 py-2 text-xl  '>All Procuct : </div> */}
      <div className=" w-full ">
          <h1 className="w-max text-lg text-var(--primary-color) font-semibold py-2 ml-6  border-b-2 border-solid border-black ">all products : </h1>
        </div>
      

        {/* <h1>Product{categorie}</h1> */}

        {/* //    {/*************************************** cards The products **************************/}

     <BodyBanner products={products}/>
       
       
       
       

    </div>
  )
}

export default Banner

