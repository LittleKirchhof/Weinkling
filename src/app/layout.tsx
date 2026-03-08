import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weinkling — Intelligent Living",
  description:
    "Weinkling transforms your home into a living, breathing environment. Precision-crafted home automation systems that respond to your rhythm.",
  keywords: [
    "home automation",
    "smart home",
    "intelligent living",
    "home control",
    "premium smart home systems",
  ],
  authors: [{ name: "Weinkling" }],
  openGraph: {
    title: "Weinkling — Intelligent Living",
    description:
      "Precision-crafted home automation systems that respond to your rhythm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0f] text-[#f5f4f0]">
        {children}
      </body>
    </html>
  );
}
