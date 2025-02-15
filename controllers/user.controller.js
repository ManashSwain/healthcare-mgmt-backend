import userModel from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const setCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

// User Registration
export const registerUser = async (req, res) => {
  try {
      console.log("Incoming Request:", req.body);
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          return res.status(400).json({ success: false, message: "All fields are required." });
      }

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ success: false, message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await userModel.create({ name, email, password: hashedPassword });
    const token = generateToken(newUser._id);

      setCookie(res, token);
      return res.status(200).json({ success: true, message: "Registered successfully.",newUser });
  } catch (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ success: false, message: "Server error during registration." });
  }
};

// User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const token = generateToken(user._id);
        setCookie(res, token);
        return res.status(200).json({ success: true, message: "Logged in successfully.",userDetails:user });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ success: false, message: "Server error during login." });
    }
};

// User Logout
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict",
        });
        return res.status(200).json({ success: true, message: "Logged out successfully." });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ success: false, message: "Server error during logout." });
    }
};
