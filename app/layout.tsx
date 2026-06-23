import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SessionProvider from "@/components/auth/SessionProvider";
import CookieConsent from "@/components/ui/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEEE TODO - Literalmente, hacemos DEEE TODO",
  description: "Copistería moderna en Algemesí, Valencia. Impresión DTF, UV, Sublimación, Cartelería, Vinilos, Regalos personalizados y envíos. Si lo puedes imaginar, nosotros lo imprimimos.",
  keywords: ["copistería", "impresión", "Algemesí", "Valencia", "DTF", "sublimación", "cartelería", "vinilos", "personalización"],
  authors: [{ name: "DEEE TODO" }],
  openGraph: {
    title: "DEEE TODO - Tu fábrica de ideas",
    description: "Imprime, Envía, Crea, Sorprende. No somos una copistería más.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-dark text-foreground">
        <SessionProvider>
          {children}
          <CookieConsent />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
