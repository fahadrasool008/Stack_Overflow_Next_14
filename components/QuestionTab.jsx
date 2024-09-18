import React from "react";
import AllQuestions from "./AllQuestions";
import { getProfileQuestions } from "@/lib/actions/profile.actions";
import Link from "next/link";

const QuestionTab = async ({ userId }) => {
  const questions = await getProfileQuestions({ userId });

  return (
    <>
      {questions.length > 0 ? (
        questions.map((item) => (
          <Link key={item._id} href={`/question/${item._id}`} legacyBehavior>
            <AllQuestions
              _id={item._id}
              title={item.title}
              tags={item.tags}
              author={item.author}
              upvotes={item.upvotes}
              answers={item.answers}
              createdAt={item.createdAt}
              views={item.views}
            />
          </Link>
        ))
      ) : (
        <p>No questions</p>
      )}
    </>
  );
};

export default QuestionTab;
