import { Inter } from "next/font/google";
import { ToastBar, Toaster } from "react-hot-toast";

import "./globals.css";
import Navbar from "./_components/shared-components/Navbar";
import Footer from "./_components/shared-components/Footer";


const inter = Inter({subsets: ['latin']});


export const metadata = {
  title: "AquaYield AI",
  description: "AquaYield AI is a precision irrigation platform that uses AI to optimize water usage for sustainable, high-yield farming.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body className={`${inter.className} antialiased`} data-theme="light">

        <Navbar />

        {children}

        <Footer />

        <Toaster position='top-right' />

      </body>
      
    </html>
  );
}
