import Image from "next/image";
import Link from "next/link";
import React from "react";

const InfoLink = ({ source, title, href }) => {
  return (
    <div className="flex gap-1">
      <Image
        src={source}
        width={18}
        height={18}
        alt="icon"
        className="invert-colors"
      />

      {href ? (
        <Link href={href}>
          {" "}
          <p className="paragraph-medium text-light-500">{title}</p>
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light800">{title}</p>
      )}
    </div>
  );
};

export default InfoLink;
