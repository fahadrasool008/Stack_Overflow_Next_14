import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";

const LocalSearchBar = () => {
  return (
    <div className="relative flex w-full max-w-[1030px]">
      <div className="background-light750_darkgradient relative flex min-h-[56px] grow items-center gap-3 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="search"
          value=""
          className="paragraph-regular no-focus placeholder background-light750_darkgradient caret-slate-500 shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default LocalSearchBar;
