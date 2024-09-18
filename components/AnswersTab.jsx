import React from "react";
import AllQuestions from "./AllQuestions";
import { getProfileAnswers } from "@/lib/actions/profile.actions";
import Link from "next/link";

const AnswersTab = async ({ userId }) => {
  const answers = await getProfileAnswers({ userId });

  return (
    <>
      {answers.length > 0 ? (
        answers.map((answer) => (
          <Link
            key={answer.question._id}
            href={`/question/${answer.question._id}`}
            legacyBehavior
          >
            <AllQuestions
              _id={answer.question._id}
              title={answer.question.title}
              author={answer.author}
              upvotes={answer.upvotes}
              createdAt={answer.createAt}
            />
          </Link>
        ))
      ) : (
        <p>No questions</p>
      )}
    </>
  );
};

export default AnswersTab;
