import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SubWiz",
  description: "Manage all your subscriptions in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-purple-900 min-h-screen">
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
