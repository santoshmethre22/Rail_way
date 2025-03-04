import express from "express";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendSms } from "../utils/sendSms.js";
import otpGenerator from "otp-generator";

const generateOtp=()=>{
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
}


 const verifyEmail =async (req, res) => {
    //const { email, phone } = req.body;
    try {
        const userId=req.user.id;
        const user=User.findById(userId);
      //const user = await User.findOne({ $or: [{ email },{ phone }] });
  
      if (!user) return res.status(404).json({ message: "User not found" });
    
      const email=user.email;

      const otp = generateOtp();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 mins
      await user.save();
  
      if (email) await sendEmail(email, otp);
     
  
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send OTP", error });
    }


}

const verifySMS=async(req,res)=>{


        try {

            const userId=req.user.id;

            const user=await User.findById(userId);

            if(!user) {
                return res.status(404).json({message:"the user is not found"});
            }


            const phone=user?.phone

            const otp = generateOtp();

            if (phone) await sendSms(phone, otp);
            
            
        } catch (error) {
            
            res.status(500).json({ message: "Failed to send OTP", error });

        }


}


export{
    verifyEmail,
    verifySMS


}

