import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/commonComponents/Navbar";
import { Provider } from "@/components/commonComponents/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata : Metadata = {
  title: "ResumeMatch AI – Smart Resume to Job Matching",
  description: "Upload your resume and get matched with the most relevant, latest jobs using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navbar/>
          {children}
        </Provider>
      </body>
    </html>
  );
}
