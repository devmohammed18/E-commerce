
import FraisLivraison from "./_component/bodycheckoutcash/bodycheckoutcash"


const getFraisLivreson= async ()=>{
      
  try{
     const res=await fetch(`${process.env.NEXT_PUBLIC_URLL}/api/fraisLivraison`,{
      cache: 'no-store', // ou { next: { revalidate: 0 } } pour Next.js 13+
      headers: {
        'Cache-Control': 'no-cache'
      }
     })
     const data=await res.json()
     
     if(!data){
      throw new Error(`http//status:${data.status}`)
     }
     
     return data


  }catch(error){
    console.log(error)
    return []
  }

}
async function CheckOutCash() {


  const DataFraisLivraison:string[]= await getFraisLivreson()
  console.log('Data in Page principle=====>:',DataFraisLivraison)
  
 
  return (
    <div className='w-full h-auto  flex-col  justify-center items-center py-1 space-y-1 mt-[85px] mb-1 bg-[var(--secondary-color)] '>
      <FraisLivraison DataFraisLivraison={DataFraisLivraison}  />
    </div>
  )
}

export default CheckOutCash
