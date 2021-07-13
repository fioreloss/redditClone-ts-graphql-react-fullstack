import nodemailer from "nodemailer";


export async function sendEmail(to:string,html:string) {

    // let testAccount = await nodemailer.createTestAccount();
    // console.log('testAccount', testAccount)
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: "b7kuoeg352ohnaks@ethereal.email", 
      pass: "Vt2xMZ2yhbddvGdB4y", 
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo " <foo@example.com>', 
    to: to, 
    subject: "change password", 
    html,
    
  });

  console.log("Message sent: %s", info.messageId);
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
}
