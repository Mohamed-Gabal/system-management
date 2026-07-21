import menuIcon from "@/assets/icons/menu.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-black/10 bg-background px-6 py-3">
      {/* Burger menu will be added in the responsive step */}
      <div>
        <button className="rounded-md p-2 lg:hidden" aria-label="Open menu">
          <Image src={menuIcon} alt="Open menu" width={30} height={30} />
        </button>
      </div>

      {/* Right section: user info + avatar */}
      <div className="flex items-center gap-4">
        {/* User information */}
        <div className="text-right">
          <p className="text-title-md font-semibold text-neutral-dark">
            User Name
          </p>
          <p className="font-bold text-body-md text-neutral">Job Title</p>
        </div>

        {/* User avatar - initials placeholder, will be computed from API data */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-surface"
          aria-hidden="true"
        >
          MT
        </div>
      </div>
    </header>
  );
};

export default Navbar;
