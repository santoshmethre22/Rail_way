import twilio from "twilio";
import otpGenerator from "otp-generator";

const generateOtp=()=>{
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
}

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

export const sendSms = async (phone, otp) => {
  await client.messages.create({
    body: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    from: twilioPhone,
    to: phone,
  });
};
