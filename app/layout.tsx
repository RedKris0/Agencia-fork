import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import tokens from "@/diseno/tokens.json";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agencia de Enlace & Seguimiento Estudiantil",
  description: "Información y acompañamiento para entrar a la educación superior en Chile.",
  applicationName: "Agencia de Enlace",
  icons: {
    icon: [
      { url: "/iconos/favicon.svg", type: "image/svg+xml" },
      { url: "/iconos/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/iconos/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: tokens.color.claro.linea },
    { media: "(prefers-color-scheme: dark)", color: tokens.color.oscuro.linea },
  ],
};

export default function LayoutRaiz({ children }: Readonly<{ children: React.ReactNode }>) {
  preload("/fuentes/atkinson-next-400.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  return (
    <html lang="es-CL" data-scroll-behavior="smooth">
      <body>
        <a className="saltar-contenido" href="#contenido">Ir al contenido</a>
        {children}
      </body>
    </html>
  );
}
