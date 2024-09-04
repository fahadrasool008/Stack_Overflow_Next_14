import Image from "next/image";
import React from "react";
import { Input } from "../components/ui/input";

const GlobalSearch = ({ style }) => {
  return (
    <div
      className={style ?? "relative flex w-full max-w-[600px] max-lg:hidden"}
    >
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
          placeholder="Global search"
          className="paragraph-regular no-focus placeholder background-light750_darkgradient caret-slate-500 shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
