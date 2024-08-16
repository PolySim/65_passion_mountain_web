import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import ValidUser from "@/service/validUser";
import { cn } from "@/lib/utils";
import WindowSizeInitializer from "@/service/WindowSizeInitializer";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import UserInitializer from "@/service/UserInitializer";
import { UserService } from "@/service/UserService";
import { useUserStore } from "@/store/userStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "65 Passion Montagne",
    template: "%s | 65 Passion Montagne",
  },
  description: "65 Passion Montagne",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, isAdmin, idToken] = await Promise.all([
    UserService.user(),
    UserService.isAdmin(),
    UserService.idToken(),
  ]);
  useUserStore.setState({ user, isAdmin, idToken });

  return (
    <html lang="fr">
      <UserProvider>
        <ValidUser />
        <WindowSizeInitializer />
        <UserInitializer user={user} isAdmin={isAdmin} idToken={idToken} />
        <body
          className={cn(
            inter.className,
            "flex flex-col w-screen min-h-screen h-screen overflow-y-auto overflow-x-hidden",
          )}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
