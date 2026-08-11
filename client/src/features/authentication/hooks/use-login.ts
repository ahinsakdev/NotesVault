import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../api/authentication.api";
import { AUTHENTICATION_QUERY_KEYS } from "../constants/authentication-query-keys";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      queryClient.setQueryData(
        AUTHENTICATION_QUERY_KEYS.session,
        session,
      );
    },
  });
}
