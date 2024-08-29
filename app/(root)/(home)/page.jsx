import Link from "next/link";
import React from "react";
import { Button } from "../../../components/ui/button";
import LocalSearchBar from "../../../components/LocalSearchBar";

const Home = () => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 max-lg:mt-[36px] sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 max-sm:w-full">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="text-dark100_light900 mt-5 flex justify-between gap-5 max-sm:flex-col max-sm:items-center">
        <LocalSearchBar />
      </div>
    </>
  );
};

export default Home;
