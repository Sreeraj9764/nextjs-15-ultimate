"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";
import useDebounce  from "@/hooks/useDebounce"; 
import { useQueryState } from "nuqs";
interface Props {
  imgSrc?: string;
  placeholder?: string;
  otherClassName?: string;
  route: string;
}

const LocalSearch = ({ imgSrc, placeholder, otherClassName, route }: Props) => {
  // const router = useRouter();
  // const pathName = usePathname();
  // const searchParams = useSearchParams();
  // const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState("");
const [_, setQuery] = useQueryState('query',{
  defaultValue: '',
  shallow: false,
}

)
  const debouncedSearchQuery = useDebounce(inputValue, 500);

  useEffect(() => {
      setQuery(debouncedSearchQuery)
  }, [debouncedSearchQuery, setQuery]);



  // useEffect(() => {
  //   const debounceFunction = setTimeout(() => {
  //     const paramsString = searchParams.toString();
  //     var newurl = "";
  //     if (searchQuery) {
  //       newurl = formUrlQuery({
  //         params: paramsString,
  //         key: "query",
  //         value: searchQuery,
  //       });
  //     } else {
  //       if (pathName === route) {
  //         newurl = removeUrlQuery({
  //           params: paramsString,
  //           keysToRemove: ["query"],
  //         });
  //       }
  //     }
  //     router.push(newurl, { scroll: false });
  //   }, 1000);
  //   return () => clearTimeout(debounceFunction);
  // }, [searchQuery, route, router, searchParams, pathName]);

  return (
    <div
      className="background-light800_darkgradient flex min-h-[56px]
    grow items-center gap-4 rounded-[10px] px-4"
    >
      {imgSrc && (
        <Image
          src={imgSrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`dark:bg-background-light800_darkgradient paragraph-regular 
          no-focus text-dark400_light700 border-none shadow-none outline-none ${otherClassName}`}
      />
    </div>
  );
};

export default LocalSearch;
