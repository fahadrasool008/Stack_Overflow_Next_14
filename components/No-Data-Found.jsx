import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const NoDataFound = ({
  title,
  description,
  link,
  linkTitle,
  isbutton = true,
}) => {
  return (
    <div className="mt-14 flex flex-col items-center justify-center gap-4">
      {isbutton ? (
        <>
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
        </>
      ) : null}
      <h3 className="h3-bold text-dark200_light800">{title}</h3>
      <p className="text-dark300_light700 max-w-md text-center">
        {description}
      </p>
      {isbutton ? (
        <Link href={link}>
          <Button className="paragraph-medium text-dark200_light900 mt-4 min-h-[45px] bg-primary-500 px-4 py-3 dark:bg-primary-500">
            {linkTitle}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default NoDataFound;
