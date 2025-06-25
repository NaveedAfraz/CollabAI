import User from "../models/users";
import jwt from "jsonwebtoken";
import inngestClient from "../inngest/client";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in signUp controller: " + error);
        res.status(500).json({ message: "Internal server error" }); 
    }
};

export const signIn = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in signIn controller: " + error);
        res.status(500).json({ message: "Internal server error" }); 
    }
};

