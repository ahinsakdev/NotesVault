export const API_ENDPOINTS = {
  auth: {
    signup: "/api/v1/auth/signup",
    login: "/api/v1/auth/login",
    me: "/api/v1/auth/me",
    logout: "/api/v1/auth/logout",
    forgotPassword: "/api/v1/auth/forgot-password",
    resetPassword: "/api/v1/auth/reset-password",
  },

  notes: {
    list: "/api/v1/notes",
    create: "/api/v1/notes",
    archived: "/api/v1/notes/archived",
    trash: "/api/v1/notes/trash",
    byId: (noteId: string) => `/api/v1/notes/${noteId}`,
    restore: (noteId: string) => `/api/v1/notes/${noteId}/restore`,
    permanent: (noteId: string) => `/api/v1/notes/${noteId}/permanent`,
  },
} as const;
