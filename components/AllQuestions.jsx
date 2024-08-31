import React from "react";
import RenderTag from "./RenderTag";
import Metric from "./Metric";
import { formatNumber, TimeFormattor } from "../lib/utils";
import { create } from "domain";

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
    <div className="flex w-full background-light750_darkgradient flex-col gap-0 rounded-xl px-10 py-8">
      <p className="small-regular hidden max-sm:flex text-dark400_light500">
        {TimeFormattor(createdAt)}
      </p>
      <h3 className="sm:h3-semibold base-semibold line-clamp-1 text-dark300_light900">
        {title}
      </h3>
      <div className="flex gap-3 flex-wrap mt-4">
        {tags.map((tag) => (
          <RenderTag _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between gap-3 mt-7 w-full flex-wrap">
        <Metric
          imageUrl="/assets/icons/avatar.svg"
          alt="author"
          title={author.name}
          value={`\u2022 asked ${TimeFormattor(createdAt)}`}
          textStyle="body-medium text-dark400_light900"
          isAuthor={true}
          href="/"
        />
        <div className="flex items-center justify-between gap-2 flex-wrap">
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
