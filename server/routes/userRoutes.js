import express from "express";
import {
    createUser, loginUser, fetchAllUsers,
    updateUser, getAUser, deleteAUser,
    blockUser, unblockUser, handleRefreshToken,
    logoutUser, userLoginStatus, verifyEmail
} from "../controllers/userCtrl.js";
import {authMiddleware, isAdmin, checkBlocked} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/login", checkBlocked, loginUser);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", isAdmin, fetchAllUsers);
router.get("/:id", authMiddleware, getAUser);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authMiddleware, updateUser);
router.patch("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/logout", logoutUser);
router.get("/login-status", userLoginStatus);
router.post("/verify-email", authMiddleware, verifyEmail);

//router.post("/verify-user/:verificationToken", verifyUser);
//router.post("/forgot-password", forgotPassword);
//router.post("/reset-password/:resetPasswordToken", resetPassword);
//router.patch("/change-password", authMiddleware, changePassword);

export default router;