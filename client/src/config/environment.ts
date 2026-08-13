const DEFAULT_API_BASE_URL = "http://localhost:4100";

function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export const environment = {
  apiBaseUrl: normalizeUrl(
    import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
  ),
} as const;
