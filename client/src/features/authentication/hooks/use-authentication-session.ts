import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { getCurrentUser } from "../api/authentication.api";
import { AUTHENTICATION_QUERY_KEYS } from "../constants/authentication-query-keys";

export function useAuthenticationSession() {
  return useQuery({
    queryKey: AUTHENTICATION_QUERY_KEYS.session,
    queryFn: async () => {
      try {
        return await getCurrentUser();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return null;
        }

        throw error;
      }
    },
    retry: false,
    staleTime: 30_000,
  });
}
