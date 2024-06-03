import AdminDashboard from "@/components/admin";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      
      </head>

      <body>
        <main className={inter.className}>
          <AdminDashboard>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            {/* <Footer /> */}
          </AdminDashboard>
        </main>
      </body>
    </html>
  );
}
