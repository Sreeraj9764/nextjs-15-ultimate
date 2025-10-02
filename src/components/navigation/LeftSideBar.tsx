import React from "react";
import NavLinks from "./navbar/NavLinks";
import AuthLinks from "./AuthLinks";
import { getSession } from "next-auth/react";
import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LeftSideBar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <section
      className="custom-scrollbar sticky left-0 top-0m h-screen flex flex-col justify-between
    border-r border-[#C8CBD954] dark:border-dark-500  bg-left-sidebar
      max-sm:hidden shadow-light-300 dark:shadow-none lg:w-[266px] p-6 pt-32"
    >
      <div className="flex flex-1 flex-col">
        <NavLinks userId={userId} />
      </div>
      {userId ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button className="base-medium w-fit !bg-transparent cursor-pointer px-4 py-3">
            <LogOut className="size-5 text-black dark:text-white" />
            <span className="max-lg:hidden text-dark300_light900 ml-2">
              Log out
            </span>
          </Button>
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          <AuthLinks />
        </div>
      )}
    </section>
  );
};

export default LeftSideBar;
