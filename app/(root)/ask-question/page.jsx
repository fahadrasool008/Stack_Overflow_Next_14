import React from "react";
import Question from "../../../components/Form/Question";
import { getUserById } from "../../../lib/actions/user.actions";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const AskQuestion = async () => {
  const { userId } = useAuth();
  const user = await getUserById({ userId });
  if (!user) redirect("/sign-in");

  return (
    <div className="max-lg:mt-[36px]">
      <h1 className="h1-bold text-dark200_light900">Ask Question</h1>
      <Question clerkId={JSON.stringify(user._id)} />
    </div>
  );
};

export default AskQuestion;
