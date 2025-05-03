import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body } from "express-validator";

import { User } from "../models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import {generateTokenAndSetCookie} from "../config/generateTokenAndSetCookie.js";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";

dotenv.config();

// signup
export const signup = expressAsyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const userAlreadyExists = await User.findOne({ email });
  console.log("userAlreadyExists", userAlreadyExists);

  if (userAlreadyExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });

  await user.save();

  // Generate JWT and set cookie
  generateTokenAndSetCookie(res, user._id);

  // await sendVerificationEmail(user.email, verificationToken);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      ...user._doc,
      password: undefined,
    },
  });

  // Exclude "verificationToken" as res
});



// Login a user
export const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  
    generateTokenAndSetCookie(res, user._id);
  
    user.lastLogin = new Date();
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
});

// logout a user
export const logout = expressAsyncHandler( async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
});


// forgot password
export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = resetTokenExpiresAt;

  await user.save();

  // Send email with reset link
  await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

  res.status(200).json({ success: true, message: "Password reset link sent to your email" });
});

// reset password
export const resetPassword = expressAsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // Update password
  const hashedPassword = await bcryptjs.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  await sendResetSuccessEmail(user.email);

  res.status(200).json({ success: true, message: "Password reset successful" });
});

// Get all users
export const fetchAllUsers = expressAsyncHandler ( async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single user
export const getAUser = expressAsyncHandler( async (req, res) => {
        const { id } = req.params;
        try {
            const getUser = await User.findById(id);
            res.json(getUser)
        } catch (error) {
            throw new Error(error)
        }
    }
);

// Delete a single user
export const deleteAUser = expressAsyncHandler( async (req, res) => {
        const { id } = req.params;
        console.log(req.params)
        try {
            const deleteUser = await User.findByIdAndDelete(id);
            res.json(deleteUser)
        } catch (error) {
            throw new Error(error)
        }
    }
);

// Update a user
export const updateUser = expressAsyncHandler( async (req, res) => {
    const { _id } = req.user;
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req.body?.firstname,
            lastname: req.body?.lastname,
            email: req.body?.email,
            mobile: req.body?.mobile
        }, {
            new: true,
        });
        res.json(updateUser)
    } catch (error) {
        throw new Error(error)
    }
});

// Block a user
export const blockUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isBlocked: true },
        { new: true } // Returns the updated user document
    );

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({ message: "User blocked successfully", user });
});

// Unblock a user
export const unblockUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isBlocked: false },
        { new: true } // Returns the updated user document
    );

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({ message: "User unblocked successfully", user });
});

// user login status
export const userLoginStatus = expressAsyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    // 401 Unauthorized
    res.status(401).json({ message: "Not authorized, please login!" });
  }
  // verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    res.status(200).json(true);
  } else {
    res.status(401).json(false);
  }
});

// email verification
export const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { code } = req.body;

  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired verification code");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  // await sendWelcomeEmail(user.email, user.name);

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
    user: {
      ...user._doc,
      password: undefined,
    },
  });
});

// check auth
export const checkAuth = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json({ success: true, user });
});


// handle refesh token
export const handleRefreshToken = expressAsyncHandler( async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken })
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
          throw new Error("No refresh token present in the database or not matched")
      }
      const accessToken = generateToken(user._id)
      res.json({ accessToken })
  });
});

