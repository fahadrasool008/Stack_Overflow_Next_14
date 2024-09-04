import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
import Filter from "./filter";
import { HomePageFilters } from "./FilterData";
import HomeFilters from "./HomeFIlters";

const LocalSearchBar = () => {
  return (
    <>
      <div className="relative flex w-full max-w-[1030px] gap-2 max-sm:flex-col">
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
            placeholder="Local search"
            className="paragraph-regular no-focus placeholder caret- bg-transparent text-slate-500 caret-slate-500 shadow-none outline-none"
          />
        </div>
        <Filter
          filters={HomePageFilters}
          contaienrClasses={"hidden  max-md:flex"}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
        />
      </div>
      <HomeFilters />
    </>
  );
};

export default LocalSearchBar;
