export const ROUTES = {
  home: "/",

  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  terms: "/terms",
  privacy: "/privacy",

  app: "/app",
  dashboard: "/app/dashboard",

  notes: "/app/notes",
  noteDetails: "/app/notes/:noteId",
  noteRead: "/app/notes/:noteId/read",

  recent: "/app/recent",
  favorites: "/app/favorites",
  pinned: "/app/pinned",
  archived: "/app/archived",

  folders: "/app/folders",
  folder: "/app/folders/:folderId",

  tags: "/app/tags",
  tag: "/app/tags/:tagId",

  search: "/app/search",
  trash: "/app/trash",
  settings: "/app/settings",
} as const;
