import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";
import ValidAdmin from "@/service/validAdmin";

export const metadata: Metadata = {
  title: "admin",
};

export default async function AdminLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 bg-yellow-light py-16 px-4 md:px-8">
      <ValidAdmin />
      {children}
      <Toaster />
    </main>
  );
}
