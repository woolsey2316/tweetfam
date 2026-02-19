import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { HttpException } from "../exceptions/HttpException.js";
/* Register User */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body
    const findUser: User = await User.findOne({ email: email });
    if (findUser)
      throw new HttpException(
        409,
        `The email ${email} already exists`,
      );
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    })
    const savedUser = await newUser.save();
    res.status(201).json(savedUser)
  } catch (err) {
    if (err instanceof HttpException) {
      res.status(err.status).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }

  }
}

/* logging in */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: "User does not exist. " })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
    
    // Store refresh token in database
    user.refreshToken = refreshToken;
    await user.save();
    
    delete user.password;
    res.status(200).json({ token: accessToken, refreshToken, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

/* refresh token */
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ msg: "Refresh token required" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find user with this refresh token
    const user = await User.findOne({ _id: decoded.id, refreshToken });
    
    if (!user) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    // Generate new access token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    
    res.status(200).json({ token: accessToken });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ msg: "Refresh token expired, please login again" });
    }
    res.status(500).json({ error: err.message });
  }
}

/* logout */
export const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Clear refresh token from database
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
