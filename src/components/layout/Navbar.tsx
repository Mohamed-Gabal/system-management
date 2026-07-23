"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/services/user";
import menuIcon from "@/assets/icons/menu.svg";
import Image from "next/image";
import { logout } from "@/services/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type NavbarProps = {
  isMenuOpen: boolean;
  onMenuClick: () => void;
};

type User = {
  user_metadata: {
    name: string;
    job_title: string;
  };
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [user, setUser] = useState<User | null>(null);

  // State For Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Handler Logout Delete
  const handleLogout = async () => {
    setIsDropdownOpen(false);

    const result = await logout();

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Logged out successfully.");
    router.replace("/login");
  };

  useEffect(() => {
    async function fetchUser() {
      const result = await getUser();

      if (result.ok) {
        setUser(result.data);
      }
    }

    fetchUser();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <header className="flex h-20 items-center lg:justify-end justify-between border-b border-neutral-light bg-surface px-6">
      {/* Burger menu will be added in responsive step */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden"
        aria-label="Open menu"
      >
        <Image src={menuIcon} alt="" width={24} height={24} />
      </button>

      {/* Right section user info + avatar */}
      <div className="relative flex items-center gap-4">
        {/* User information */}
        <div className="text-right">
          <p className="text-title-md font-semibold text-neutral-dark">
            {user?.user_metadata.name || "User Name"}
          </p>

          <p className="font-bold text-body-md text-neutral">
            {user?.user_metadata.job_title || "Job Title"}
          </p>
        </div>

        {/* User avatar */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-surface cursor-pointer"
        >
          {getInitials(user?.user_metadata.name || "")}
        </button>
        {/* Dropdown For Logout */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 z-50 w-44 rounded-lg border border-black/10 bg-white p-2 shadow-lg">
            <button
              onClick={handleLogout}
              type="button"
              className="w-full rounded-md px-3 py-2 text-left text-body-md text-error transition-colors hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
