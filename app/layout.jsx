import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className={inter.className}>
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer/>
        </main>
      </body>
    </html>
  );
}
