

import Link from 'next/link';
import Image from 'next/image';
import { typeProduct } from '@/app/util/type/type';
// import { axiosGet } from '@/app/util/fetchApi/axiosGet';


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
      <div className='border-0 border-solid border-red-800 py-2 text-xl  '>All Procuct : </div>
      <div className='w-full min-h-screen mt-[10px] mb- p-6 flex flex-wrap justify-around gap-y-5 items-center bg-white border border-solid border-black  '>

        {/* <h1>Product{categorie}</h1> */}

        {/* //    {/*************************************** cards The products **************************/}
        {products && products.map(({ id, title_pro, images }: typeProduct, index: number) => (


          <div className='sm:w-full w-72 h-full border-0 border-solid border-red-900' key={index}>

            <Link href={`/productdetails/${id} `} className=" sm:w-full block rounded-lg p-4 shadow-sm shadow-indigo-100 border hover:shadow-md hover:border hover:border-solid hover:border-indigo-300 hover:rounded-lg ">
              {/* ********************   big image Cart Product ******************** */}
              <div className='w-full h-full box-border'>




                {images && images.length > 0 && images[0]?.url_image[0]?.url ?


                  (<Image
                    alt="image"
                    src={images[0].url_image[0].url} width={1000} height={1000}
                    className=" sm:w-80 sm:h-full  h-72 w-full rounded-md object-cover"
                  />)


                  : (<div className="w-full h-80 bg-gray-200 " >
                    <span>Image Available</span>
                  </div>)}

              </div>

              {/************************Details Cart Product **************************/}
              <div className="mt-2">

                <dl>
                  <div>
                    <dt className="sr-only">Price</dt>
                    {/* <dd className="text-sm text-gray-500">${images[0].price}</dd> */}
                  </div>

                  <div>
                    <dt className="sr-only">title de produit</dt>
                    <dd className="font-medium">{title_pro}</dd>
                  </div>
                </dl>

                <div className=" mt-3 flex items-center gap-2 text-xs">


                  {images.map(({ url_image }, index: number) => (
                    <div
                      //  onClick={()=>setIdImage(index)} 

                      key={index}
                      className="w-20 h-24  sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <Image
                        alt=""
                        src={url_image[0].url} width={80} height={80}
                        className="h-full w-full rounded-md object-cover"
                      />
                    </div>
                  ))}
                </div>

              </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Banner

