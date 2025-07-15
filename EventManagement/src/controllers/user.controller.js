import * as UserModel from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const user = await UserModel.createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
