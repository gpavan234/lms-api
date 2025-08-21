import User from  '../models/User.js';

// GET all users
export const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// CREATE a user (dummy)
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password, role });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};
