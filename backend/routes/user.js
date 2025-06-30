import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { signIn, signUp } from "../controllers/user.js";
import { logout } from "../controllers/user.js";
import { getUser } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
import { getAuthenticatedUser } from "../controllers/user.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", signIn);
router.post("/logout", authenticate, logout);
router.get("/getUser", authenticate, getUser);
router.get("/getUsers", authenticate, getUsers);
router.post("/updateUser", authenticate, updateUser);
router.get("/getAuthenticatedUser", authenticate, getAuthenticatedUser);

export default router;
