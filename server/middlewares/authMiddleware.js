import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers?.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
                const user = await User.findById(decoded?.userId);
                if (!user) {
                    return res.status(401).json({ message: "User not found" });
                }
                req.user = user;
                next();
            } else {
                return res.status(401).json({ message: "No token attached to the header" });
            }
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token expired. Please log in again" });
        }
    } else {
        return res.status(401).json({ message: "No token attached to the header" });
    }
});

export const isAdmin = expressAsyncHandler( async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403); //Forbidden status code
        throw new Error("Access denied. Admins only.");
    }
});

// checkBlocked
export const checkBlocked = expressAsyncHandler( async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email })
    if (user && user.isBlocked) {
        res.status(403);
        throw new Error("Your account is blocked.");
    }

    next();
});


