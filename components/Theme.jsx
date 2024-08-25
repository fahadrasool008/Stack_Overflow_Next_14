"use client";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";
import Image from "next/image";
import { themes } from "../constants/constants";

const Theme = () => {
  const { mode, setMode } = useContext(ThemeContext);
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:bg-dark-200 dark:data-[state-open]:bg-dark-200">
          {mode === "dark" ? (
            <Image
              src="assets/icons/moon.svg"
              width={20}
              height={20}
              className="active-theme cursor-pointer"
              alt="dark"
            />
          ) : (
            <Image
              src="assets/icons/sun.svg"
              width={20}
              height={20}
              className="active-theme cursor-pointer"
              alt="light"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-16 mt-2 min-w-[120px] rounded border py-2  dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item, index) => (
            <MenubarItem
              key={index}
              className="flex gap-4 hover:cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={item.icon}
                width={16}
                height={16}
                alt="icon"
                className={`${mode === item.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${mode === item.value ? "text-primary-500" : "text-dark100_light900"}`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
