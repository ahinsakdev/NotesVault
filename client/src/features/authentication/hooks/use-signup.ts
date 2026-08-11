import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signup } from "../api/authentication.api";
import { AUTHENTICATION_QUERY_KEYS } from "../constants/authentication-query-keys";

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: (session) => {
      queryClient.setQueryData(
        AUTHENTICATION_QUERY_KEYS.session,
        session,
      );
    },
  });
}
