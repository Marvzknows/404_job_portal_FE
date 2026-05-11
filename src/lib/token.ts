export const token = {
  set: (token: string) => localStorage.setItem("auth_token", token),
  get: () => localStorage.getItem("auth_token"),
  clear: () => localStorage.removeItem("auth_token"),
  clearAll: () => localStorage.clear(),
};
