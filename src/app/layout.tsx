import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AetherDeFi.fun",
  description: "Web4 Creation Begins Here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}