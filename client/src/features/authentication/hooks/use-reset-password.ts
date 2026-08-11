import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resetPassword } from "../api/authentication.api";
import { AUTHENTICATION_QUERY_KEYS } from "../constants/authentication-query-keys";

export function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.setQueryData(AUTHENTICATION_QUERY_KEYS.session, null);
    },
  });
}
