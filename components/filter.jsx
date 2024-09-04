import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/dropdown";

const Filter = ({ filters, otherClasses, contaienrClasses }) => {
  return (
    <div className={`${contaienrClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} background-light750_dark300 light-border body-regular text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="no-focus background-light800_dark300 border-light-500 outline-none dark:border-dark-200">
          <SelectGroup>
            {filters.map((item, index) => {
              return (
                <SelectItem
                  key={index}
                  value={item.value}
                  className="text-dark300_light700"
                >
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
