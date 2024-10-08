"use client";
import Image from "next/image";
import Link from "next/link";

const Metric = ({
  imageUrl,
  href = null,
  alt,
  title,
  value,
  isAuthor = false,
  textStyle,
}) => {
  const Loader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const MetricContent = (
    <div className="flex-center gap-1 ">
      <Image
        loader={Loader}
        src={imageUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href !== null ? "rounded-full" : ""}`}
      />
      <p className={`${textStyle} flex items-center gap-1`}>
        <span className={`${textStyle}`}>{title}</span>{" "}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "text-dark400_light500 max-sm:hidden" : ""}`}
        >
          {" "}
          {value}
        </span>
      </p>
    </div>
  );
  if (href) {
    return <Link href={href}> {MetricContent} </Link>;
  }
  return <>{MetricContent}</>;
};

export default Metric;
