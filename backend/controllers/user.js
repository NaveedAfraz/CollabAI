import User from "../models/users.js";
import jwt from "jsonwebtoken";
import inngestClient from "../inngest/client.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/mailer.js";
import users from "../models/users.js";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: hashedPassword });

    await inngestClient.send({
      name: "user/signUp",
      data: {
        email,
        password,
      },
    });

    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error("Error in signUp controller: " + error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User signed in successfully",
        success: true,
      });
  } catch (error) {
    console.error("Error in signIn controller: " + error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token, "token");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error("Error in logout controller: " + error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user, "user");
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized or token not valid", success: false });

    const userFound = await User.findOne({ email: user.email }).select(
      "-password"
    );
    if (!userFound)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    return res.status(200).json({ userFound, success: true });
  } catch (error) {
    console.error("Error in getUser controller: " + error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { skills = [], role, email } = req.body;
    const user = req.user;
    console.log(user, "user");
    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const userFound = await users.findOne({ email }).select("-password");
    if (!userFound) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    userFound.skills = skills;
    userFound.role = role;
    await userFound.save();
    return res
      .status(200)
      .json({ message: "User updated successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getAuthenticatedUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user, "user");
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized or token not valid", success: false });

    const userFound = await User.findOne({ email: user.email }).select(
      "-password"
    );
    if (!userFound)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    return res.status(200).json({ userFound, success: true });
  } catch (error) {
    console.error("Error in getAuthenticatedUser controller: " + error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
