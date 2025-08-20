import User from '../models/user.js';

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
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};
