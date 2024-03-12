import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/app/ui/dashboard/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard Test",
  description: "Dashboard Testing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white`}>
        <div className="flex flex-row h-full">
          <div className="pt-5 pb-5 bg-slate-600 relative h-full w-48 text-white">
            <Menu />
          </div>
          <div className="p-10 w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
