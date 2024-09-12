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
import PostAnswer from "@/components/PostAnswer";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { getAnswers } from "@/lib/actions/answer.actions";
import NoDataFound from "@/components/No-Data-Found";
import Votes from "@/components/Votes";

const page = async ({ params }) => {
  const { userId } = auth();

  const user = await getUserById({ userId });
  const result = await getQuestionById(params.id);
  const answersList = await getAnswers({ questionId: result._id });

  return (
    <section className="flex w-full max-w-full flex-col max-lg:mt-12">
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

        <div className="text-dark200_light800">
          <Votes
            type="question"
            userId={JSON.stringify(user._id)}
            questionId={JSON.stringify(result._id)}
            upvotes={result.upvotes.length}
            downvotes={result.downvotes.length}
            hasUpVoted={result.upvotes.includes(user._id)}
            hasDownVoted={result.downvotes.includes(user._id)}
            hasSaved={user.saved.includes(result._id)}
          />
        </div>
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
          value={formatNumber(result.upvotes.length)}
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imageUrl="/assets/icons/message.svg"
          alt="message"
          title="Answers"
          value={formatNumber(result.answers.length)}
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
      <div className="my-10 flex w-full items-center justify-between">
        <p className="primary-text-gradient paragraph-semibold">
          {answersList.length} Answers
        </p>
        <Filter filters={HomePageFilters} />
      </div>
      {answersList ? (
        answersList.map((answer) => (
          <div
            key={answer._id}
            className="mb-8 flex w-full flex-col border-b-2 border-light-500/20 pb-2 "
          >
            <div className="flex w-full justify-between  max-xs:flex-col max-xs:gap-3">
              <Link href={`/profile/1`} className="flex items-center gap-1">
                <Image
                  src={answer.author.picture}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full"
                />
                <p className="body-semibold text-dark200_light800">
                  {answer.author.name}
                </p>
                <p className="small-regular text-light-500 ">
                  answered {TimeFormattor(answer.createdAt)}
                </p>
              </Link>

              <div className="text-dark200_light800">
                <Votes
                  type="answer"
                  userId={JSON.stringify(user._id)}
                  answerId={JSON.stringify(answer._id)}
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                  hasUpVoted={answer.upvotes.includes(user._id)}
                  hasDownVoted={answer.downvotes.includes(user._id)}
                />
              </div>
            </div>
            <div className="text-dark300_light700 body-regular my-6 w-full">
              <HtmlParser data={answer.content} />
            </div>
          </div>
        ))
      ) : (
        <NoDataFound
          title={"No answers yet!"}
          description={"Be the first to help by answering."}
          isbutton={false}
        />
      )}
      <PostAnswer
        author={JSON.stringify(user._id)}
        question={JSON.stringify(result._id)}
      />
    </section>
  );
};

export default page;
