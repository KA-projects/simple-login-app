import { Router } from "express";
import authController from "../controllers/authController.ts";
import userController from "../controllers/userController.ts";
import { authMiddleware } from "../middleware/auth-middleware.ts";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/refresh", authController.refresh);

router.post("/get-user", authMiddleware, userController.getUser);

export default router;
