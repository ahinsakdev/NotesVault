import type { Request } from "express";

import type { AuthenticatedUser } from "../../users/utils/serialize-user.js";

export type AuthenticatedRequest = Request & {
  user: AuthenticatedUser;
};
