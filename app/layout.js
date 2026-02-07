import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ipmaxtv.shop - Premium IPTV Subscriptions | 4K & FHD",
  description: "Get instant access to 15,000+ live TV channels, movies, and series in 4K/FHD. Compatible with Samsung, LG, VIDAA, Android, and Firestick. Start your 24h trial for €0.99.",
  keywords: "IPTV subscription, premium iptv, 4k iptv, smart tv iptv, samsung iptv, lg iptv, vidaa iptv, m3u playlist, buy iptv, cheap iptv",
  openGraph: {
    title: "ipmaxtv.shop - Premium 4K IPTV Service",
    description: "Access 15,000+ channels and VODs. Instant delivery & Anti-freeze technology.",
    url: "https://ipmaxtv.shop",
    siteName: "ipmaxtv.shop",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: '/favicon.svg',
  },
};

import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ClientProviders from "@/components/providers/ClientProviders";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          {children}
          <WhatsAppButton />
        </ClientProviders>
      </body>
    </html>
  );
}
