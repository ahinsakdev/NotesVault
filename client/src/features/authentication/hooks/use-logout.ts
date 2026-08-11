import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../api/authentication.api";
import { AUTHENTICATION_QUERY_KEYS } from "../constants/authentication-query-keys";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(
        AUTHENTICATION_QUERY_KEYS.session,
        null,
      );
    },
  });
}
