import React from "react";
import LocalSearchBar from "../../../components/LocalSearchBar";
import NoDataFound from "../../../components/No-Data-Found";
import { getAllTags } from "../../../lib/actions/tags.actions";
import Link from "next/link";

const page = async () => {
  const tags = await getAllTags();
  console.log(tags);
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 !overflow-auto max-lg:mt-[36px] sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </div>
      <div className="mt-5">
        <LocalSearchBar showTabFilter={true} />
      </div>
      <section className="mt-12 flex w-full flex-wrap gap-4 max-xs:flex-col">
        {tags ? (
          tags.map((item) => (
            <Link
              className="shadow-light101_darknone opacity-90 transition-all  duration-200 hover:opacity-100"
              href={`/tags/${item._id}`}
              key={item._id}
            >
              <article className=" background-light900_dark200 light-border flex w-full flex-col items-center rounded-lg border px-8 py-10 sm:w-[258px]">
                <div className="background-light750_dark300 w-fit rounded-[4px] px-4 py-1.5 ">
                  <p className="text-dark300_light900 body-semibold">
                    {item.name}
                  </p>
                </div>
                <p className="text-light400_light500 small-medium mt-3.5 text-center">
                  <span className="primary-text-gradient body-semibold mr-1.5">
                    {item.questions.length}+
                  </span>
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <div className="mt-[-50px] size-full">
            <NoDataFound
              title={"There’s no tags to show"}
              description={
                "Be the first to break the silence! by asking Question."
              }
              link={"/ask-question"}
              linkTitle={"Ask a Question"}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default page;
