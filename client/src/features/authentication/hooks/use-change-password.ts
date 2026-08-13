import { useMutation } from "@tanstack/react-query";

import { changePassword } from "../api/authentication.api";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
