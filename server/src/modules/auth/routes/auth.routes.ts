import { Router } from "express";

import { validateRequest } from "../../../shared/middleware/validate-request.js";
import {
  changePassword,
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { changePasswordSchema } from "../schemas/change-password.schema.js";
import { forgotPasswordSchema } from "../schemas/forgot-password.schema.js";
import { loginSchema } from "../schemas/login.schema.js";
import { resetPasswordSchema } from "../schemas/reset-password.schema.js";
import { signupSchema } from "../schemas/signup.schema.js";
import { updateProfileSchema } from "../schemas/update-profile.schema.js";

export const authRouter = Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);

authRouter.post("/login", validateRequest(loginSchema), login);

authRouter.get("/me", authenticate, getCurrentUser);

authRouter.patch(
  "/profile",
  authenticate,
  validateRequest(updateProfileSchema),
  updateProfile,
);

authRouter.patch(
  "/password",
  authenticate,
  validateRequest(changePasswordSchema),
  changePassword,
);

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