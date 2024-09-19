"use server";
import AnswersTab from "@/components/AnswersTab";
import InfoLink from "@/components/InfoLink";
import { StatesCard } from "@/components/ProfileStates";
import QuestionTab from "@/components/QuestionTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { getUserInfo } from "@/lib/actions/profile.actions";
import { formatDate } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const { userId } = auth();
  const id = params.id;
  const userinfo = await getUserInfo({ userId: id });
  console.log("User info:\t", userinfo);

  return (
    <>
      <div className="flex w-full flex-col-reverse max-lg:mt-4 lg:flex-row">
        <div className="flex flex-1 flex-col items-start gap-4 max-lg:-mt-5 max-lg:gap-1 lg:flex-row">
          <Image
            src={userinfo.user.picture}
            width={140}
            height={140}
            alt="profile"
            className="rounded-full object-cover"
          />
          <div className="mt-5 flex flex-col gap-3 max-lg:mt-1">
            <div className="flex flex-col gap-1">
              <h2 className="h2-bold text-dark400_light900">
                {userinfo.user.name}
              </h2>
              <p className="paragraph-regular text-light-400">
                @{userinfo.user.username}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <InfoLink
                source="/assets/icons/link.svg"
                title="Website"
                href={userinfo.user.portfolioWebsit ?? "#"}
              />
              <InfoLink
                source="/assets/icons/location.svg"
                title={userinfo.user.location ?? "N/A"}
              />
              <InfoLink
                source="/assets/icons/calendar.svg"
                title={formatDate(userinfo.user.joinedAt)}
              />
            </div>
            <p className="paragraph-regular text-dark400_light800 opacity-90">
              {userinfo.user.bio}
            </p>
          </div>
        </div>
        <div className="mt-3 flex justify-end max-sm:mb-4 max-xs:w-full ">
          <SignedIn>
            {userId === userinfo.user.clerkId && (
              <Link href="#" className="max-xs:w-full">
                <Button className="text-dark400_light900 btn-secondary min-h-[46px] min-w-[175px] max-xs:w-full ">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="text-dark400_light900 flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px]">
            <TabsTrigger value="top-posts" className="tab ">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab userId={userinfo.user._id} />
          </TabsContent>
          <TabsContent value="answers">
            <AnswersTab userId={userinfo.user._id} />
          </TabsContent>
        </Tabs>
      </div>

      <StatesCard
        totalAnswers={userinfo.totalAnswerrs}
        totalQuestion={userinfo.totalQuestions}
      />
    </>
  );
};

export default page;
