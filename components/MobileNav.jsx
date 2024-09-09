"use client";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { sidebarLinks } from "../constants/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex flex-1 flex-col gap-4 pt-6">
      {sidebarLinks.map((item, index) => {
        const activeLink =
          pathname.includes(item.route && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose key={index} asChild>
            <Link
              href={item.route}
              className={`${activeLink ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 p-4`}
            >
              <Image
                className={`${activeLink ? "" : "invert-colors"}`}
                src={item.imgURL}
                width={20}
                height={20}
                alt="side-Img"
              />
              <p className={`${activeLink ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={30}
          height={30}
          alt="menu"
          className="invert-colors cursor-pointer sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg: background-light900_dark200 flex max-h-screen flex-col border-none outline-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <SheetClose asChild>
          <NavContent />
        </SheetClose>

        <SignedOut>
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[50px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign In</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-tertiary min-h-[50px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="text-dark200_light800">Sign Up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
