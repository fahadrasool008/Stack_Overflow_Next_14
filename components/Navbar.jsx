import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";
import GlobalSearch from "./GlobalSearch";

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 fixed z-50 flex w-full flex-col items-center gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <div className="flex w-full justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow"
          />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-xs:hidden">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <GlobalSearch />
        <div className="flex gap-4">
          <Theme />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <MobileNav />
        </div>
      </div>
      <GlobalSearch style={"relative flex w-full max-w-[800px] lg:hidden"} />
    </nav>
  );
};

export default Navbar;
