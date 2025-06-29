import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { signIn, signUp } from "../controllers/user.js";
import { logout } from "../controllers/user.js";
import { getUser } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", authenticate, logout);
router.get("/getUser", authenticate, getUser);
router.post("/updateUser", authenticate, updateUser);

export default router;