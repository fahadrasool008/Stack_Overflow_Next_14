import Image from "next/image";
import Link from "next/link";
import React from "react";

const AnswerLayout = () => {
  return (
    <div className="w-full flex flex-col pb-4 border-b-[2px] border-light-500/20 ">
      <div className="flex w-full justify-between max-xs:flex-col max-xs:gap-3">
        <Link href={`/profile/1`} className="flex items-center gap-1">
          <Image
            src="/assets/icons/avatar.svg"
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
          <p className="body-semibold text-dark200_light800">Fahad Rasool</p>
          <p className="small-regular text-light-500 ">
            answered Aug 6,2024 at 21:04
          </p>
        </Link>

        <div className="text-dark200_light800 w-10">1</div>
      </div>
      <div className="text-dark300_light700 my-6 w-full body-regular">
        I think what you want to do is probably not to attach the foreach
        function to only the one array you have here, but to make it work for
        all arrays. <br />
        To do that, you must edit the Array prototype (something that some
        people have very strong opinions about, because you can not protect
        against potential future namespace collisions - but other people find
        extremely useful).
      </div>
    </div>
  );
};

export default AnswerLayout;
