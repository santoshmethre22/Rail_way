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

    
  },
  { timestamps: true }
);


UserSchema.static.isAdmin=()=>{


    if(this.role==="admin") return true;

    return false;


}


export  const User=mongoose.model("User",UserSchema)

