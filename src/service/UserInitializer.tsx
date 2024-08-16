"use client";

import { Claims } from "@auth0/nextjs-auth0";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

const UserInitializer = ({
  user,
  idToken,
  isAdmin,
}: {
  user: Claims | null;
  isAdmin: boolean;
  idToken: string | undefined;
}) => {
  const setUser = useUserStore((state) => state.setUser);
  const setIdToken = useUserStore((state) => state.setIdToken);
  const setIsAdmin = useUserStore((state) => state.setIsAdmin);

  useEffect(() => {
    user && setUser(user);
    idToken && setIdToken(idToken);
    setIsAdmin(isAdmin);
  }, [user, idToken, isAdmin]);

  return <></>;
};

export default UserInitializer;
