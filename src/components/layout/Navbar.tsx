"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/services/user";
import menuIcon from "@/assets/icons/menu.svg";
import Image from "next/image";

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
      return words[0][0].toUpperCase();
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

      {/* Right section: user info + avatar */}
      <div className="flex items-center gap-4">
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
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-surface"
          aria-hidden="true"
        >
          {getInitials(user?.user_metadata.name || "")}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
