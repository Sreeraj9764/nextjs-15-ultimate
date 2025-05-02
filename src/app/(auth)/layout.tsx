import SocialAuth from "@/components/form/SocialAuth";
import Image from "next/image";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth  px-4 py-10">
      <section
        className="light-border background-light800_dark200 min-w-full shadow-light-100_dark100
      rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark-100_light900">Join DevFlow</h1>
            <p className="paragraph-regular text-dark500_light400">
              To get your questions answered
            </p>
          </div>
          <Image
            src="images/site-logo.svg"
            alt={"siteLogo"}
            width={54}
            height={54}
            className="object-contain"
          ></Image>
        </div>
        {children}
        <SocialAuth />
      </section>
    </main>
  );
};
export default AuthLayout;
