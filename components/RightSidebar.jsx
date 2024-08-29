import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const questions = [
    { _id: 1, question: "What is your name?" },
    { _id: 2, question: "How old are you?" },
    { _id: 3, question: "What is your favorite color?" },
    { _id: 4, question: "What is your profession?" },
    { _id: 5, question: "Where do you live?" },
  ];
  const Tags = [
    {
      _id: 1,
      name: "Javascript",
      count: 3,
    },
    {
      _id: 2,
      name: "React",
      count: 3,
    },
    {
      _id: 3,
      name: "Flutter",
      count: 3,
    },
    {
      _id: 4,
      name: "Python",
      count: 7,
    },
    {
      _id: 5,
      name: "C++",
      count: 4,
    },
  ];

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pb-2 pt-32 shadow-light-300 dark:shadow-none max-xl:hidden ">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Qurstions</h3>
        <div className="mt-7 flex w-full flex-col gap-4">
          {questions.map((item) => {
            return (
              <Link
                key={item._id}
                href={`/questions/${item._id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {" "}
                  {item.question}{" "}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex w-full flex-col gap-4">
          {Tags.map((item) => {
            return (
              <RenderTag
                key={item._id}
                _id={item._id}
                name={item.name}
                totalQuestions={item.count}
                showCount={true}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
