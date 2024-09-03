import React from "react";
import RenderTag from "./RenderTag";
import Metric from "./Metric";
import { formatNumber, TimeFormattor } from "../lib/utils";

const AllQuestions = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}) => {
  return (
    <div className="background-light750_darkgradient flex w-full flex-col gap-0 rounded-xl px-10 py-8">
      <p className="small-regular text-dark400_light500 hidden max-sm:flex">
        {TimeFormattor(createdAt)}
      </p>
      <h3 className="sm:h3-semibold base-semibold text-dark300_light900 line-clamp-1">
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <RenderTag key={tag}  _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-7 w-full flex-wrap gap-3">
        <Metric
          imageUrl="/assets/icons/avatar.svg"
          alt="author"
          title={author.name}
          value={`\u2022 asked ${TimeFormattor(createdAt)}`}
          textStyle="body-medium text-dark400_light900"
          isAuthor={true}
          href="/"
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Metric
            imageUrl="/assets/icons/upvote.svg"
            alt="upvote"
            title="Votes"
            value={formatNumber(upvotes)}
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imageUrl="/assets/icons/message.svg"
            alt="message"
            title="Answers"
            value={formatNumber(answers.length)}
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imageUrl="/assets/icons/eye.svg"
            alt="author"
            title="Views"
            value={formatNumber(views)}
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
