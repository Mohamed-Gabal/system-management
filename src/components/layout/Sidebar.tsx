"use client";

import { sidebarLinks } from "@/constant/sidebar-links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoIcon from "@/assets/icons/logo.svg";
import collapseIcon from "@/assets/icons/collapse.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import { useState } from "react";

const Sidebar = () => {
  // Get current route to determine the active link
  const pathname = usePathname();

  // Controls whether the sidebar is collapsed or expanded
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <aside
      className={`hidden flex h-screen flex-col justify-between border-r border-black/10 bg-surface-low p-4 transition-all duration-300 lg:flex ${isCollapse ? "w-20" : "w-64"}`}
    >
      {/* Top section: Logo + Navigation links */}
      <div>
        {/* Sidebar Header / Logo */}
        <header className="flex items-center gap-2 pb-6">
          <Image src={logoIcon} alt="Taskly Logo" width={20} height={20} />
          {!isCollapse && (
            <span className="text-title-md font-bold text-neutral-dark">
              Taskly
            </span>
          )}
        </header>

        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex h-10 items-center gap-3 rounded px-3 py-2.5 transition-colors ${
                      isActive
                        ? "bg-surface text-primary shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                        : "text-neutral-dark hover:bg-surface/60"
                    }`}
                  >
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={20}
                      height={20}
                      aria-hidden="true"
                    />

                    {!isCollapse && (
                      <span
                        className={`text-body-md font-medium ${
                          isActive ? "text-primary" : "text-neutral-dark"
                        }`}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Sidebar Footer: Collapse + Logout */}
      <footer className="border-t border-black/10 pt-5">
        {/* Collapse toggle - TODO: wire up actual collapse/expand state */}
        <button
          type="button"
          onClick={() => setIsCollapse((prev) => !prev)}
          className={`mb-5 flex w-full items-center gap-3 text-neutral-dark transition-colors hover:text-primary ${isCollapse ? "justify-center" : ""}`}
        >
          <Image
            src={collapseIcon}
            alt="Collapse"
            width={10}
            height={10}
            className={`transition-transform duration-300 ${isCollapse ? "rotate-180" : ""}`}
          />
          {!isCollapse && (
            <span className="text-body-md font-medium">Collapse</span>
          )}
        </button>

        {/* Logout */}
        <Link
          href={"/"}
          className={`flex items-center gap-3 text-error transition-colors hover:opacity-80 ${isCollapse ? "justify-center" : ""}`}
        >
          <Image src={logoutIcon} alt="" width={20} height={20} />
          {!isCollapse && (
            <span className="text-body-md font-medium">Logout</span>
          )}
        </Link>
      </footer>
    </aside>
  );
};

export default Sidebar;
