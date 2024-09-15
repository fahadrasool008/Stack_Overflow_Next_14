"use client";
import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.actions";
import { ViewQuestion } from "@/lib/actions/interaction.actions";
import {
  downVoteQuestion,
  upVoteQuestion,
} from "@/lib/actions/questions.actions";
import { saveQuestion } from "@/lib/actions/user.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect } from "react";

const Votes = ({
  type,
  hasUpVoted,
  hasDownVoted,
  userId,
  questionId,
  answerId,
  hasSaved,
  upvotes,
  downvotes,
}) => {
  const path = usePathname();
  const router = useRouter();

  const handleVote = async (action) => {
    if (action === "upvote") {
      if (type === "question") {
        await upVoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(questionId),
          hasUpVoted,
          hasDownVoted,
          path,
        });
      } else if (type === "answer") {
        await upVoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(answerId),
          hasUpVoted,
          hasDownVoted,
          path,
        });
      }
    } else if (action === "downvote") {
      if (type === "question") {
        await downVoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(questionId),
          hasUpVoted,
          hasDownVoted,
          path,
        });
      } else if (type === "answer") {
        await downVoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(answerId),
          hasUpVoted,
          hasDownVoted,
          path,
        });
      }
    } else if (action === "save") {
      await saveQuestion({
        userId: JSON.parse(userId),
        questionId: JSON.parse(questionId),
        hasSaved,
        path,
      });
    }
  };

  useEffect(() => {
    console.log("q--id:\t", userId);

    ViewQuestion({
      userId: userId ? JSON.parse(userId) : undefined,
      questionId: questionId ? JSON.parse(questionId) : undefined,
      path,
    });
    return () => {
      router.refresh();
    };
  }, [path, questionId, userId, router]);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-0.5">
        <Image
          src={
            hasUpVoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          alt="upvote"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => {
            handleVote("upvote");
          }}
        />
        <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
          <p className="text-dark400_light900 subtle-medium">{upvotes}</p>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <Image
          src={
            hasDownVoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          alt="downvote"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => {
            handleVote("downvote");
          }}
        />
        <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
          <p className="text-dark400_light900 subtle-medium">{downvotes}</p>
        </div>
      </div>

      <Image
        src={
          hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star.svg"
        }
        alt="saved"
        width={18}
        height={18}
        className={`cursor-pointer ${type === "answer" ? "hidden" : ""}`}
        onClick={() => {
          handleVote("save");
        }}
      />
    </div>
  );
};

export default Votes;
