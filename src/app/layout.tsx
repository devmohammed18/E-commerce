import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { typeCategorie,typeSubCategorie } from "./util/type/type";
import Header from "./_component/header/header";
import Footer from "./_component/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default async function RootLayout({children,}: 
  Readonly<{children: React.ReactNode;}>){
  
    /******************************* Fetch Categories *********************************/
    console.log('--------->',process.env.NEXT_PUBLIC_API_URL)
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/categories",{
    headers:{ Authorization:"Bearer "+process.env.NEXT_PUBLIC_API_TOKEN }
  });

  if(!res.ok){
    throw Error (`error APT Satus: ${res.status}`)
  }  
  const data= await res.json();
  const categories: typeCategorie[] = data.data; //information de categories
  console.log('==========================Serveur===================')
  console.log(categories[1].title_cat)
  console.log('==========================Serveur===================')

  /************************** Fetch SubCategories *********************************/ 
  const subCategories:[string,typeSubCategorie[]][]=[];
  for(let i=0;i<categories.length;i++){
      
      const resSub=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories?filters[categories][title_cat]=${categories[i].title_cat}`,{
        headers:{ Authorization:"Bearer "+process.env.NEXT_PUBLIC_API_TOKEN  }
       })
    
      const dataSub= await resSub.json()
     
    subCategories[i]=[categories[i].title_cat,dataSub.data];//table multiple subgategories
  }
/********************************************************************************* */
 
console.log('=====================serveur subcat===============')
//console.log(subCategories)
//const subCategories1=JSON.parse(JSON.stringify(subCategories, null, 2)) 
console.log(subCategories[0][1])
console.log('=====================serveur subcat===============')
 



  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        
       
         {/* <ClerkLoading>
            <ProvidreStore>

                   
                    <div className="w-full min-h-screen bg-[--secondary-color] opacity-75 absolute top-0 right-0 left-0 bottom-0" >
                          
                    
                    {children}
                          

                    </div>
            </ProvidreStore> 
          </ClerkLoading>   */}

          {/* <ClerkLoaded>  */}
          {/* <ProvidreStore> */}

          <Header categories={categories} subCategories={subCategories} /> 
                {/* <Suspense fallback={<div>Laoding...</div>} > */}
                {children}
                {/* </Suspense> */}
                <Footer />
            {/* </ProvidreStore>  */}
        {/* </ClerkLoaded>  */}


      </body>
    </html>
  );
}
