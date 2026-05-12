import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayz",
  description: "Report • Connect • Resolve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}