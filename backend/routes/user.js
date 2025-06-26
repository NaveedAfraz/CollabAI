import express from "express";
import { authenticate } from "../middleware/authenticate";
import { signIn, signUp } from "../controllers/user";
import { logout } from "../controllers/user";
import { getUser } from "../controllers/user";
import { updateUser } from "../controllers/user";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", authenticate, logout);
router.get("/getUser", authenticate, getUser);
router.post("/updateUser", authenticate, updateUser);

export default router;