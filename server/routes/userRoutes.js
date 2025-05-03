import express from "express";
import {
    signup, login, fetchAllUsers,
    updateUser, getAUser, deleteAUser,
    blockUser, unblockUser, handleRefreshToken,
    logout, userLoginStatus, verifyEmail,
    forgotPassword, resetPassword,
    checkAuth
} from "../controllers/userCtrl.js";
import {authMiddleware, isAdmin, checkBlocked} from "../middlewares/authMiddleware.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", /*signupValidator,*/ signup);
// router.get("/login", checkBlocked, login);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logout);
router.get("/login-status", userLoginStatus);

router.get("/all-users", isAdmin, fetchAllUsers);
router.get("/:id", authMiddleware, getAUser);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authMiddleware, updateUser);
router.patch("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;