import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../custom/Header";
import Footer from "../custom/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
