import { Router } from "express";

import { validateRequest } from "../../../shared/middleware/validate-request.js";
import {
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  signup,
  resetPassword,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { forgotPasswordSchema } from "../schemas/forgot-password.schema.js";
import { loginSchema } from "../schemas/login.schema.js";
import { signupSchema } from "../schemas/signup.schema.js";
import { resetPasswordSchema } from "../schemas/reset-password.schema.js";

export const authRouter = Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);

authRouter.post("/login", validateRequest(loginSchema), login);

authRouter.get("/me", authenticate, getCurrentUser);

authRouter.post("/logout", logout);

authRouter.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  forgotPassword,
);

authRouter.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  resetPassword,
);