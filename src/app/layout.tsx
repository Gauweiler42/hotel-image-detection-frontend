import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Image Detection",
  description: "Created and trained by Leon Gauweiler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex items-center justify-center m-0 p-0">
        <div className="flex-1 text-center">{children}</div>
      </body>
    </html>
  );
}
