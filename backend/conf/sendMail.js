

import nodemailer from "nodemailer"
import otpGenerator from "otp-generator";

const generateOtp=()=>{
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
}

const sendEmail=async(email,otp)=>{
    const transporter =nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS,
        }
    })
    const mailoptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:"otp for email verification ",
        text:`your otp ${otp} will expires in in 10 minutes`, 
    }
    await transporter.sendMail(mailoptions);
}

export default sendEmail;