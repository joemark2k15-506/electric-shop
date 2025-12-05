// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import Header from "@/components/header";
import PageTransition from "@/components/PageTransition";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electric Shop",
  description: "Your one-stop shop for electrical products",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {/* Header */}
            <Header />

            {/* Page transitions */}
            <PageTransition>
              <main className="min-h-screen flex-1">{children}</main>
            </PageTransition>

            {/* Footer */}
            <footer className="border-t py-6 bg-muted">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} Electric Shop. All rights
                  reserved.
                </p>
              </div>
            </footer>

            {/* Toaster for notifications */}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
