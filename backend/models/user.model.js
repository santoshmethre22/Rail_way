import mongoose from "mongoose";
import bcrypt from "bcrypt"; // <-- You forgot this

const UserSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true
    },
    email: { 
      type: String, 
      required: true,
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    }, 
    
    files: [
      {
        url: { type: String }, 
        fileType: { type: String }, 
        uploadedAt: { type: Date, default: Date.now }
      }
    ],

    phone: {
      type: String,
      default: "0000000000"
    },

    otp: { type: String }, // Stores OTP
    otpExpires: { type: Date }, // OTP Expiration Time
    isVerified: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true }
);

UserSchema.statics.isAdmin = function (role) {
  return role === "admin";
};

// Pre-save hook for password hashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method for checking password
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
