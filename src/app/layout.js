import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header/header";

const inter = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
  title: "Shop-TI",
  description: "Shop-TI is a simple e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
