import { Roboto_Slab } from "next/font/google";
import "./globals.css";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
