import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserCard = ({ user }) => {
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full px-4 py-3 max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="avatar"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular mt-2 text-light-500">@{user.username}</p>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
