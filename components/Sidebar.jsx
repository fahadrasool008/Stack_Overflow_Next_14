"use client";
import React from "react";
import { sidebarLinks } from "../constants/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pb-2 pt-32 shadow-light-300 dark:shadow-none max-lg:pt-44 max-sm:hidden lg:w-[266px] ">
      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((item, index) => {
          const activeLink =
            pathname.includes(item.route && item.route.length > 1) ||
            pathname === item.route;
          return (
            <Link
              key={index}
              href={item.route}
              className={`${activeLink ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4  p-4 max-lg:justify-center  `}
            >
              <Image
                className={`${activeLink ? "" : "invert-colors"}`}
                src={item.imgURL}
                width={20}
                height={20}
                alt="side-Img"
              />
              <p
                className={`${activeLink ? "base-bold" : "base-medium"} body-regular max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-2">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[50px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Sign In
              </span>
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="small-medium btn-tertiary min-h-[50px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="assets/icons/sign-up.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="text-dark200_light800 max-lg:hidden">
                Sign Up
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default Sidebar;
