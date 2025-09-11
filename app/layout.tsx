import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "modern-normalize";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NotesHub",
  description: "Write, edit and search your notes. ",
  openGraph: {
    title: "NoteHub",
    description: "Write, edit and search your notes. ",
    url: "https://soliq.rest/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable}`}>
        <div className="wrapper">
          <TanStackProvider>
            <Header />
            <main className="main">
              {children}
              {modal}
            </main>
            <Footer />
          </TanStackProvider>
        </div>
      </body>
    </html>
  );
}
