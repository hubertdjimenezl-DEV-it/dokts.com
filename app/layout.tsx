import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const doktsSans = DM_Sans({
  variable: "--font-dokts-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const doktsMono = Space_Mono({
  variable: "--font-dokts-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dokts — Asistente de IA para médicos en Perú",
  description:
    "Dokts escucha la consulta, transcribe y estructura la historia clínica mientras atiendes. Ahorra hasta un 40% del tiempo administrativo. De consulta a receta en 30 segundos.",
  openGraph: {
    title: "Dokts — IA que entiende tu consulta",
    description:
      "Tu voz dicta. Dokts entiende. Tú sanas. Asistente clínico para profesionales de la salud en Perú.",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${doktsSans.variable} ${doktsMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
