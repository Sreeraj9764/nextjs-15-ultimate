import React from "react";
import NavLinks from "./navbar/NavLinks";
import AuthLinks from "./AuthLinks";

const LeftSideBar = () => {
  return (
    <section
      className="custom-scrollbar sticky left-0 top-0m h-screen flex flex-col justify-between
    border-r border-[#C8CBD954] dark:border-dark-500  bg-left-sidebar
      max-sm:hidden shadow-light-300 dark:shadow-none lg:w-[266px] p-6 pt-32"
    >
      <div className="flex flex-1 flex-col">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-3">
        <AuthLinks />
      </div>
    </section>
  );
};

export default LeftSideBar;
