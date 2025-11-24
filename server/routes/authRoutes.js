import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import bcrypt from "bcryptjs";
import Task from "../models/Tasks.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if its an existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Then finally create a user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Signup Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Signup Error", error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Login Error", error);
  }
});

// UPDATE PROFILE
router.put(
  "/profile",
  protect,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const updateData = {
        name: req.body.name,
        email: req.body.email,
      };

      if (req.file && req.file.path) {
        updateData.profilePic = req.file.path;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true }
      ).select("-password");

      return res.json(updatedUser);
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

// CHANGE PASSWORD
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Ensure both are provided
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    // 2. Fetch user
    const user = await User.findById(req.user.id);

    // 3. Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // 4. Prevent using the same password again
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res
        .status(400)
        .json({ message: "New password must be different" });
    }

    // 5. Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Change Password Error", error);
  }
});

// DELETE ACCOUNT
router.delete("/delete-account", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Delete all user tasks
    await Task.deleteMany({ user: userId });

    // Delete Cloudinary profile photo
    if (req.user.profilePic && req.user.profilePic.includes("cloudinary")) {
      const publicId = req.user.profilePic.split("/").pop().split(".")[0];
      cloudinary.uploader.destroy(`smarttask/profiles/${publicId}`);
    }

    // 3. Delete user from database
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Delete Account Error", error);
  }
});

export default router;