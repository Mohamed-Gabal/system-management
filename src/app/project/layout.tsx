"use client";

import { ReactNode, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MobileDrawer from "@/components/layout/Sidebar/MobileDrawer";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import BottomNav from "@/components/layout/BottomNav";

export default function ProjectLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen((prev) => !prev)}
        />

        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
