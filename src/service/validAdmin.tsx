"use client";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserService } from "@/service/UserService";
import { useRouter } from "next/navigation";

const ValidAdmin = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const isAdmin = async () => {
      await UserService.isAdmin().then((isAdmin) => {
        if (!isLoading && !isAdmin) {
          router.replace("/");
        }
      });
    };
  }, [user, isLoading]);

  return <></>;
};

export default ValidAdmin;
