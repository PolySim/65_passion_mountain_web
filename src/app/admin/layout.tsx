import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { UserService } from "@/service/UserService";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "admin",
};

export default async function AdminLayout({ children }: PropsWithChildren) {
  await UserService.isAdmin().then((isAdmin) => {
    if (!isAdmin) {
      redirect("/");
    }
  });

  return (
    <main className="flex-1 bg-yellow-light py-16 px-4 md:px-8">
      {children}
    </main>
  );
}
