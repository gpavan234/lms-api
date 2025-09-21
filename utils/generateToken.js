import jwt from "jsonwebtoken";

// Pass the user object instead of just id
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, role: user.role }, // include name & role
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export default generateToken;
