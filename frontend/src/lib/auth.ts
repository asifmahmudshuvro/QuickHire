const AUTH_TOKEN_KEY = "quickhire_admin_token";
const USER_AUTH_TOKEN_KEY = "quickhire_user_token";
const AUTH_COOKIE_KEY = "quickhire_admin_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12;

function setAuthCookie(value: string): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}

function clearAuthCookie(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  setAuthCookie("1");
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  clearAuthCookie();
}

export function getUserAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(USER_AUTH_TOKEN_KEY);
}

export function setUserAuthToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(USER_AUTH_TOKEN_KEY, token);
}

export function clearUserAuthToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(USER_AUTH_TOKEN_KEY);
}
