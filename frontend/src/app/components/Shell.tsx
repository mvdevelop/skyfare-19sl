"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

const HIDDEN_ROUTES = ["/Login"];

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout = HIDDEN_ROUTES.includes(pathname);

  return (
    <>
      {!hideLayout && <Nav />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
