import { getSession } from "@auth0/nextjs-auth0";

const getUser = async () => {
  const session = await getSession();
  if (!session) return null;
  return session.user;
};

const isLoggedIn = async (): Promise<boolean> => {
  const session = await getSession();
  return !!session;
};

const isAdmin = async (): Promise<boolean> => {
  const user = await getUser();
  return user?.app_metadata?.role === "admin";
};

const idToken = async () => {
  const session = await getSession();
  return session?.idToken;
};

const email = async () => {
  const user = await getUser();
  return user?.email;
};

const id = async () => {
  const user = await getUser();
  return user?.sub;
};

export const UserService = {
  user: getUser,
  isLoggedIn,
  idToken,
  isAdmin,
  email,
  id,
};
