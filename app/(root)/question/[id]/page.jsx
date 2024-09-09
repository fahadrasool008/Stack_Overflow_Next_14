import React from "react";
import { getQuestionById } from "../../../../lib/actions/questions.actions";
import Link from "next/link";
import Image from "next/image";
import Metric from "../../../../components/Metric";
import { formatNumber, TimeFormattor } from "../../../../lib/utils";
import HtmlParser from "../../../../components/HtmlParser";
import RenderTag from "../../../../components/RenderTag";
import Filter from "@/components/filter";
import { HomePageFilters } from "@/components/FilterData";
import AnswerLayout from "@/components/AnswerLayout";
import PostAnswer from "@/components/PostAnswer";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";

const page = async ({ params }) => {
  const { userId } = auth();
  const result = await getQuestionById(params.id);
  let user = await getUserById(userId);
  console.log(userId);
  console.log(user);

  return (
    <section className="flex w-full max-w-full flex-col ">
      <div className="flex w-full justify-between">
        <Link
          href={`/profile/${result.author._id}`}
          className="flex items-center gap-1"
        >
          <Image
            src={result.author.picture}
            width={22}
            height={22}
            alt="profile"
            className="rounded-full"
          />
          <p className="body-semibold text-dark200_light800">
            {result.author.name}
          </p>
        </Link>

        <div className="text-dark200_light800 w-10">1</div>
      </div>
      <h1 className="h3-semibold flex-start text-dark300_light900 mt-3 w-full">
        {result.title}
      </h1>

      <div className="mb-6 mt-4 flex w-full flex-wrap items-center justify-start gap-4">
        <Metric
          imageUrl="/assets/icons/clock.svg"
          title={""}
          value={`Asked ${TimeFormattor(result.createdAt)}`}
          textStyle="body-medium text-dark400_light900"
          isAuthor={false}
        />
        <Metric
          imageUrl="/assets/icons/upvote.svg"
          alt="upvote"
          title="Votes"
          value={formatNumber(result.upvotes ?? 0)}
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imageUrl="/assets/icons/message.svg"
          alt="message"
          title="Answers"
          value={formatNumber(result.answers ?? 0)}
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imageUrl="/assets/icons/eye.svg"
          alt="author"
          title="Views"
          value={formatNumber(result.views)}
          textStyle="small-medium text-dark400_light800"
        />
      </div>

      <HtmlParser data={result.explanation} />
      <div className="mt-4 flex w-full flex-wrap items-center justify-start gap-2">
        {result.tags.map((tag) => (
          <RenderTag key={tag._id} showCount={false} name={tag.name} />
        ))}
      </div>
      <div className="w-full flex items-center justify-between my-10">
        <p className="primary-text-gradient paragraph-semibold">138 Answers</p>
        <Filter filters={HomePageFilters} />
      </div>
      <AnswerLayout />
      <PostAnswer />
    </section>
  );
};

export default page;
