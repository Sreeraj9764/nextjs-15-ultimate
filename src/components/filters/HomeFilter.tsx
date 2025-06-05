"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

const filters = [
  { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommeded", value: "recommended" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const query = searchParams.get("filter") || "";
  const [filterQuery, setFilterQuery] = useState("");

  const onClick = (filter: string) => {
    const paramsString = searchParams.toString();
    let newurl = "";
    if (filter === filterQuery) {
      setFilterQuery("");
      newurl = removeUrlQuery({
        params: paramsString,
        keysToRemove: ["filter"],
      });
    } else {
      setFilterQuery(filter);
      newurl = formUrlQuery({
        params: paramsString,
        key: "filter",
        value: filter,
      });
    }
    router.push(newurl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap sm:flex gap-3">
      {filters.map((e) => (
        <Button
          key={e.name}
          className={cn(
            `cursor-pointer background-light800_darkgradient px-6 py-3
           body-medium shadow-none`,
            filterQuery === e.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          onClick={() => onClick(e.value)}
        >
          <p>{e.name}</p>
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
