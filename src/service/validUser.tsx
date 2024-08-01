"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const ValidUser = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  if (!isLoading && !user) {
    router.replace("/api/auth/login");
  }

  return <></>;
};

export default ValidUser;
