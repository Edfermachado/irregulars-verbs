// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Irregular Verbs Practice",
  description: "Una aplicación moderna para practicar verbos irregulares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Agregamos suppressHydrationWarning aquí
    <html lang="es" suppressHydrationWarning>
     <body className="bg-zinc-950 text-zinc-100 antialiased">
  {children}
</body>
    </html>
  );
}