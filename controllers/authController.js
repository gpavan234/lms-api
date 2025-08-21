import jwt from "jsonwebtoken";
import User from "../models/User.js";
import e from "express";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET, // ✅ must not be undefined
    { expiresIn: "1h" }
  );
};
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      return res.json({ message: 'Name, email and password are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409);
      return res.json({ message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password, role });

    // Don’t return password
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};


export const loginUser  = async (req, res) => {
  try{
const {email,password} = req.body;
console.log(email, password);
if(!email || !password){  
    res.status(400);
    console.log('Email and password are required');
    return res.json({ message: 'Email and password are required' });
  }
const user = await User.findOne({ email });
if(!user){  
    res.status(401);
    return res.json({ message: 'Invalid email or password' });
  } 
if(user && await user.matchPassword(password)) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      });
    }else{
      res.status(401);
      return res.json({ message: 'Invalid email or password' });  
    }
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}