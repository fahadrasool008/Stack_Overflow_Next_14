import AllQuestions from "@/components/AllQuestions";
import LocalSearchBar from "@/components/LocalSearchBar";
import NoDataFound from "@/components/No-Data-Found";
import { getTagQuestions } from "@/lib/actions/tags.actions";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const questions = await getTagQuestions({ tagId: params.id });
  console.log(questions);

  return (
    <>
      <div className="flex  w-full flex-col justify-start gap-2 !overflow-auto pb-1 pr-1 max-lg:mt-[36px] ">
        <h1 className="h1-bold text-dark100_light900 mb-2">Saved Questions</h1>
        <LocalSearchBar showTabFilter={true} />
      </div>
      <div className="text-dark400_light900 mt-8 flex flex-col-reverse justify-center gap-4 !overflow-auto max-lg:mt-[36px] sm:flex-row sm:items-center ">
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

export default page;
