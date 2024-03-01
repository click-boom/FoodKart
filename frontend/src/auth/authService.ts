const ACCESS_TOKEN_KEY = "accessToken";
const ADMIN_STATUS_KEY = "adminStatus";
const ID = "userId";
const EMAIL = "email";

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) !== null;
};

export const Login = (
  token: string,
  userId: string,
  isAdmin: boolean,
  email: string
): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(ID, userId);
  localStorage.setItem(ADMIN_STATUS_KEY, isAdmin.toString());
  localStorage.setItem(EMAIL, email);
};

export const isAdmin = (): boolean => {
  const adminStatus = localStorage.getItem(ADMIN_STATUS_KEY);

  if (adminStatus === "true") {
    return adminStatus.toLowerCase() === "true";
  } else return false;
};

export const clearLocalStorage = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ADMIN_STATUS_KEY);
  localStorage.removeItem(ID);
  localStorage.removeItem("tokenVerified");
  localStorage.removeItem(EMAIL);
};
