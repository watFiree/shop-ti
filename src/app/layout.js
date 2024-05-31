import { Roboto_Slab } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";

const inter = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
  title: "Shop-TI",
  description: "Shop-TI is a simple e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ToastContainer />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
