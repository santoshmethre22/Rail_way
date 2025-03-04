import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String,
    
      required: true },
    email: { type: String, required: true,
       unique: true },
    password: { type: String, 
      required: true },
   // phone: {type:Number,require:true},
    role: { type: String, enum: ["user", "admin"], default: "user" }, // User roles
    
    files: [
      {
        url: { type: String }, // Cloudinary URL
        fileType: { type: String }, // image or video
        uploadedAt: { type: Date, default: Date.now }
      }
    ],

    phone:{
      type:String ,
      default:"0000000000"
    },

  otp: { type: String }, // Stores OTP
  otpExpires: { type: Date }, // OTP Expiration Time
  isVerified: { type: Boolean, default: false }, 
    
  },
  { timestamps: true }
);


UserSchema.static.isAdmin=()=>{


    if(this.role==="admin") return true;

    return false;


}


export  const User=mongoose.model("User",UserSchema)

