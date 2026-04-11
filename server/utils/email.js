const dotenv=require('dotenv');
dotenv.config();

const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);




const sendBookingEmail=async(userEmail,userName,eventTitle)=>{
    try {
        const mailOptions={
            from:process.env.EMAIL_USER,
            to:userEmail,
            subject:`Booking Confirmed: ${eventTitle}`,
            html:`
            <h2 style="color:#111;">Hi ${userName}!</h2>
            <p style="color:#999; font-size:12px;">Your Booking for the event <strong>${eventTitle}</strong> is successfully </p>
            <p style="color:#999; font-size:12px;">Thank you for choosing Jashnify</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent Successfully to', userEmail);
    } catch (error) {
        console.log('Error sending email:',error);
        
    }
}

const sendOtpEmail=async(email,otp,type)=>{
   try {
    const title=type==='account_verification' ? 'Verify your Jashnify Account':'Jashnify Booking Verification';
    const msg=type==='account_verification'?'Please use the following OTP to verify your new Jashnify account.'
                                            :'Please use the following OTP to verify and confirm your event booking';
     const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:title,
         html:`
         <div style="font-family:Arial,sans-serif; text-align-center; padding:20px;">
         <h2 style="color:#111;">${title}</h2>
         <p style="color:#555; font-size:16px;">${msg}</p>
         <div style="margin:20px auto;padding:15px; font-size:24px; font-weight:bold; background:#f4f4f4; width:max-content; letter-spacing:2px">
         ${otp}
         </div>
         <p style="color:#999; font-size:12px;">This code expire in 5 mins</p>
         <div>
         `
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email} for ${type}`);
    
   } catch (error) {
    console.log(`Error sending OTP email to ${email} for ${type}:`,error);
   }
}








module.exports={sendBookingEmail,sendOtpEmail};