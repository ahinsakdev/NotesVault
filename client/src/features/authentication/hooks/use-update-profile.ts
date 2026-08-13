import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "../api/authentication.api";
import { AUTHENTICATION_QUERY_KEYS } from "../constants/authentication-query-keys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (session) => {
      queryClient.setQueryData(
        AUTHENTICATION_QUERY_KEYS.session,
        session,
      );
    },
  });
}
