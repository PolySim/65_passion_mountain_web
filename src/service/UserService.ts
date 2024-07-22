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

export const UserService = {
  user: getUser,
  isLoggedIn,
};
