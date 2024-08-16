"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const ValidAdmin = () => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin]);

  return <></>;
};

export default ValidAdmin;
