import nodemailer from 'nodemailer'
import { EmailTemplate } from '@/app/_component/emaitTemplate/emailTemplate';
import { typeProduct } from '@/app/util/type/type';
import Handlebars from 'handlebars';

 //for retreive the url images the products 
 Handlebars.registerHelper('getImageUrl',function(images){

    if(images && images[0] && images[0].url_images && images[0].url_image[0]){
        return images[0].url_image[0].url
    }
    return images[0].url_image[0].url
})

Handlebars.registerHelper('getPrice',function(images){

    if(images && images[0] && images[0].price ){
        return images[0].price
    }
    return images[0].price
})

// Handlebars.registerHelper('formatDate', function (date_order: string) {
//     return date_order; // La date est déjà formatée sur le serveur
//   });



export async function POST(request:Request) {
   
    try {
     // const data = await request.json(); // Parse JSON data from the request body
      const { email,products,num_order,date_order,amount}:{email:string,products:typeProduct,num_order:string,date_order:string,amount:number} = await request.json();
      console.log('Email:',email); // Log incoming request data
     
      // const datee=new Date(date_order)
      const formattedDate = new Date(date_order).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
       
      console.log('date Order :',date_order)
      console.log('formattedDate',formattedDate)
      console.log(products)
     // console.log(products[0].title_pro)
 // Create a transporter object using SMTP transport
 const transporter = nodemailer.createTransport({

     service: 'gmail', // You can use other services like 'SendGrid', 'Mailgun', etc.
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });
  

 
  const mailOptions = {
    from:process.env.EMAIL , // Sender address
    to:email , // List of recipients
    email:process.env.EMAIL,
     subject:'Recipts', 
     text:'hi client' ,
     // html:`<h1>hi mmmmmmmmmmmmmohamed</h1>`
    html:compileEmaileTemplate(products,num_order,formattedDate,amount)
    

  };

  // Send mail with defined transport object
  await transporter.sendMail(mailOptions);


      // Here you would add your email sending logic
      // For example, using a third-party service or library
  
      return new Response(
        
        JSON.stringify({ message: 'Email sent successfully!' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error processing request:', error);
  
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500 }
      );
    }
  }



function compileEmaileTemplate(products:typeProduct,num_order:string,date_order:string,amount:number):string{

 const template=Handlebars.compile(EmailTemplate)
 const bodyHtml=template({products,num_order,date_order,amount})

return bodyHtml
 } 