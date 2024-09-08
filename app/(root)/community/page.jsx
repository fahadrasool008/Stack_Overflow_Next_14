import React from "react";
import LocalSearchBar from "../../../components/LocalSearchBar";
import TagCard from "../../../components/TagCard";
import { getAllUsers } from "../../../lib/actions/user.actions";
import NoDataFound from "../../../components/No-Data-Found";

const page = async () => {
  const users = await getAllUsers();
  console.log(users);
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 !overflow-auto max-lg:mt-[36px] sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="text-dark100_light900 mt-5 flex justify-between gap-5 max-sm:flex-col max-sm:items-center md:flex-col">
        <LocalSearchBar showTabFilter={true} />
      </div>
      <section className="mt-12 flex w-full flex-wrap">
        {users ? (
          <TagCard />
        ) : (
          <div className="mt-[-50px] size-full">
            <NoDataFound
              title={"There’s no users to show"}
              description={
                "Be the first to break the silence! 🚀 login to continue"
              }
              link={"/sign-in"}
              linkTitle={"Login now"}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default page;
