import NavBar from "@/components/navigation/navbar";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import React, { ReactNode } from "react";
import RightSideBar from "@/components/navigation/RightSideBar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section
          className="flex min-h-screen flex-col flex-1 px-6 pb-6 pt-36
        max-md:pb-14 sm:px-14"
        >
          <div className="mx-auto w-full max-w-5xl"> {children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default RootLayout;
