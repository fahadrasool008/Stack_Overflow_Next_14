import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 flex-between fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow"
        />
      </Link>
      <p className="h2-bold max-sm: hidden font-spaceGrotesk text-dark-100 dark:text-light-900">
        Dev<span className="text-primary-500">Flow</span>
      </p>
    </nav>
  );
};

export default Navbar;
