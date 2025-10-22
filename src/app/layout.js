
import { Unbounded, Sora } from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "remixicon/fonts/remixicon.css";

import Nav from "./components/Nav";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400","500","600","700"]
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400","500","600","700"]
});

export const metadata = {
  title: "Skyfare Tours & Travel - 19SL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressContentEditableWarning={true}>
      <body
        className={`${unbounded.variable} ${sora.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
