import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { UserService } from "@/service/UserService";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "admin",
};

export default async function AdminLayout({ children }: PropsWithChildren) {
  const { isAdmin, isLoading } = {
    isAdmin: await UserService.isAdmin(),
    isLoading: await UserService.isLoading(),
  };

  if (!isLoading && !isAdmin) {
    redirect("/");
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <main className="flex-1 bg-yellow-light py-16 px-4 md:px-8">
      {children}
      <Toaster />
    </main>
  );
}
