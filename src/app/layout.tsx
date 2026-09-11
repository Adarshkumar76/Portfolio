import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import StarfieldCanvas from "@/components/canvas/StarfieldCanvas";

export const metadata: Metadata = {
  title: "Adarsh Kumar Singh | Full Stack Developer & E-Commerce Engineer",
  description:
    "Portfolio of Adarsh Kumar Singh - Full Stack Developer specializing in Next.js, React, Node.js, TypeScript, Shopify App Development, WooCommerce Plugins, and Distributed Microservices.",
  keywords: [
    "Adarsh Kumar Singh",
    "Full Stack Developer",
    "MERN Stack",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Shopify Apps",
    "WooCommerce Plugins",
    "Docker",
    "REST APIs",
    "WebSockets",
  ],
  authors: [{ name: "Adarsh Kumar Singh" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#030014] text-gray-100 min-h-screen relative selection:bg-purple-500 selection:text-white">
        {/* Persistent 3D Starfield Canvas */}
        <StarfieldCanvas />

        {/* Global Floating Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
