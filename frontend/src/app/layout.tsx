import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Lotty - Fair Friend Lotteries",
  description: "Fair, transparent, automated friend lotteries powered by smart contracts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: 'AEONIK, sans-serif' }}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
