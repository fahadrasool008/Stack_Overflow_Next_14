import Link from "next/link";
import React from "react";
import { Button } from "../../../components/ui/button";
import LocalSearchBar from "../../../components/LocalSearchBar";
import NoDataFound from "../../../components/No-Data-Found";
import { questions } from "../../../lib/utils";
import AllQuestions from "../../../components/AllQuestions";

const Home = () => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 !overflow-auto max-lg:mt-[36px] sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 max-sm:w-full">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="text-dark100_light900 mt-5 flex justify-between gap-5 max-sm:flex-col max-sm:items-center md:flex-col">
        <LocalSearchBar />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((item) => (
            <AllQuestions
              key={item._id}
              _id={item._id}
              title={item.title}
              author={item.author}
              tags={item.tags}
              upvotes={item.upvotes}
              answers={item.answers}
              createdAt={item.createdAt}
              views={item.views}
            />
          ))
        ) : (
          <NoDataFound
            title={"There’s no question to show"}
            description={
              "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            }
            link={"/"}
            linkTitle={"Ask a Question"}
          />
        )}
      </div>
    </>
  );
};

export default Home;
