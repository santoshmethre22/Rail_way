import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const registerUser = async (req, res) => {
  try {
    const { name, email, password ,role} = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password,role});
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: "Invalid credentials" });

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: "password wrong Invalid credentials" });

const { password: _, ...userData } = user.toObject();

const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

return res.status(200).json({ token, user: userData });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get-user 
const getUser = async (req, res) => {
  try {
    const userId = req.user._id;  
    const user = await User.findById(userId)
      .select("-password -__v -createdAt -updatedAt -otp -isVerified -otpExpires"); // ✅ use select, not populate

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "The user logged in successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const setUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user:user });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

export {
  registerUser, 
  loginUser,
  setUser,
  getUser
}



