import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import Provider from "@/provider";
import { Toaster } from "react-hot-toast";
import TopLoader from "@/components/toploader";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} custom-scroll-horizontal text-white`}
      >
        <TopLoader />
        <Provider>{children}</Provider>
        <Toaster position="top-right" reverseOrder />
      </body>
    </html>
  );
}
