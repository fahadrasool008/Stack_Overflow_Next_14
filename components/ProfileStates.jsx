import Image from "next/image";
import React from "react";

const ProfileStates = ({ source, title, value }) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-1 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={source} width={40} height={50} alt="states" />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

export const StatesCard = ({ totalQuestion, totalAnswers }) => {
  return (
    <div className="mt-10">
      <h4 className="text-dark200_light900 h3-semibold">Sates</h4>
      <div className="mt-5 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {totalQuestion}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {totalAnswers}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <ProfileStates
          source="/assets/icons/gold-medal.svg"
          title="Gold Badges"
          value="2"
        />
        <ProfileStates
          source="/assets/icons/silver-medal.svg"
          title="Silver Badges"
          value="5"
        />
        <ProfileStates
          source="/assets/icons/bronze-medal.svg"
          title="Bronze Badges"
          value="12"
        />
      </div>
    </div>
  );
};

export default ProfileStates;
