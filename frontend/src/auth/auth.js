// Simple auth helper (NO JWT)
// Stores authenticated user info in localStorage.

const USER_KEY = 'todo_auth_user';

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

