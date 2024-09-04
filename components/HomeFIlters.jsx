"use client";
import React from "react";
import { HomePageFilters } from "./FilterData";
import { Button } from "./ui/button";

const HomeFilters = () => {
  const active = "newest";
  return (
    <div className="mt-2 hidden flex-wrap gap-4 md:flex">
      {HomePageFilters.map((item, index) => (
        <Button
          key={index}
          onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 ${active === item.value ? "bg-primary-100 text-primary-500 dark:bg-dark-200" : "bg-light-800 text-light-500 dark:bg-dark-200"}`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
