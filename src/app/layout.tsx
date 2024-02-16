import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Providers from "../providers/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const plusjakartasans = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Task Management App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-light-main-bg dark:bg-dark-main-bg`}
      >
        <Providers>
          <ToastContainer
            pauseOnFocusLoss={false}
            bodyClassName="toast"
            autoClose={3000}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
