import FraisLivraison from "./_component/bodycheckoutcash/bodycheckoutcash"


const getFraisLivreson= async ()=>{
      
  try{
     const res=await fetch('http://localhost:3000/api/fraisLivraison')
     const data=await res.json()
     
     if(!data){
      throw new Error(`http//status:${data.status}`)
     }

     return data


  }catch(error){
    console.log(error)
  }

}
async function CheckOutCash() {


  const DataFraisLivraison:string[]= await getFraisLivreson()
  console.log(DataFraisLivraison)
  
 
  return (
    <div className='w-full h-auto  flex-col  justify-center items-center py-1 space-y-1 mt-[85px] mb-1 bg-[var(--secondary-color)] '>
      <FraisLivraison DataFraisLivraison={DataFraisLivraison}  />
    </div>
  )
}

export default CheckOutCash
