"use client";

import { ReactNode, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function ProjectLayout({ children }: { children: ReactNode }) {
  // State For Change Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    // Main Application Layout
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex flex-col flex-11">
        {/* Top Navigation */}
        <Navbar />
        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
