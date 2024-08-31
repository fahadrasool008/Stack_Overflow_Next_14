import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const NoDataFound = ({ title, description, link, linkTitle }) => {
  return (
    <div className="mt-14 flex flex-col items-center justify-center gap-4">
      <Image
        src="/assets/images/light-illustration.png"
        width={270}
        height={200}
        alt="no-questions"
        className="dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        width={270}
        height={200}
        alt="no-questions"
        className=" hidden dark:flex"
      />
      <h3 className="h3-bold text-dark200_light800">{title}</h3>
      <p className="text-dark300_light700 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="paragraph-medium text-dark200_light900 bg-primary-500 dark:bg-primary-500 min-h-[45px] py-3 px-4 mt-4">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoDataFound;
