import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import {generateToken} from "../config/jwtToken.js";
import {generateRefreshToken} from "../config/refreshToken.js";
/*
import sendEmail from "../config/sendEmail.js";
*/
import hashToken from "../config/hashToken.js";
import jwt from "jsonwebtoken";

// Create a user
export const createUser= expressAsyncHandler( async (req, res) => {
  const email = req.body.email;
  const findUser= await User.findOne( { email: email }); // Removed await

  if (!findUser) {
      const newUser =  await User.create(req.body);
      res.json(newUser);
  } else {
      throw new Error("User Already Exists. Please try logging in.")
  }
});

// Login a user
export const loginUser = expressAsyncHandler( async (req, res) => {
    const { mobile, email , password } = req.body;
    // Check if user exists or not
    const findUser= await User.findOne({
        $or: [
            {email : email },
            { mobile: mobile }]
    });
    console.log(findUser);
    if (findUser && await findUser.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3*24*60*60*1000,
        })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    }else {
        throw new Error("Invalid credentials.")
    }
});

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

// logout a user

export const logoutUser = expressAsyncHandler( async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken)
        throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // no content
    }
    await User.findOneAndUpdate( { refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
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
  const user = await User.findById(req.user._id);

  // if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check if user is already verified
  if (user.isVerified) {
    return res.status(400).json({ message: "User is already verified" });
  }

  let token = await Token.findOne({ userId: user._id });

  // if token exists --> delete the token
  if (token) {
    await token.deleteOne();
  }

  // create a verification token using the user id --->
  const verificationToken = crypto.randomBytes(64).toString("hex") + user._id;

  // hast the verification token
  const hashedToken = hashToken(verificationToken);

  await new Token({
    userId: user._id,
    verificationToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }).save();

  // verification link
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  // send email
  const subject = "Email Verification - AuthKit";
  const send_to = user.email;
  const reply_to = "noreply@gmail.com";
  const template = "emailVerification";
  const send_from = process.env.USER_EMAIL;
  const name = user.name;
  const url = verificationLink;

  try {
    // order matters ---> subject, send_to, send_from, reply_to, template, name, url
    await sendEmail(subject, send_to, send_from, reply_to, template, name, url);
    return res.json({ message: "Email sent" });
  } catch (error) {
    console.log("Error sending email: ", error);
    return res.status(500).json({ message: "Email could not be sent" });
  }
});


