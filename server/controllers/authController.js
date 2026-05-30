import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email and password are required.");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists.");
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email },
        token: generateToken(user._id),
      });
    }
    res.status(401);
    throw new Error("Invalid email or password.");
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res) => {
  res.json({ success: true, user: req.user });
};
