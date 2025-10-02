"use client";
import React from "react";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";
import { link } from "fs";
import Image from "next/image";

const AuthLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const buttons = [
    <Link href={ROUTES.SIGN_IN}>
      <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg cursor-pointer px-4 py-3">
        <Image
          src="icons/account.svg"
          width={20}
          height={20}
          alt="Log In"
          className={cn(isMobileNav && "hidden", "invert-colors")}
        />
        <span
          className={cn(
            !isMobileNav && "max-lg:hidden",
            "primary-text-gradient"
          )}
        >
          Log In
        </span>
      </Button>
    </Link>,
    <Link href={ROUTES.SIGN_UP}>
      <Button
        className=" small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px]
       w-full rounded-lg px-4 py-3 shadow-none cursor-pointer"
      >
        <Image
          src="icons/sign-up.svg"
          width={20}
          height={20}
          alt="Sign Up"
          className={cn(isMobileNav && "hidden", "invert-colors")}
        />
        <span className={cn(!isMobileNav && "max-lg:hidden")}>Sign Up</span>
      </Button>
    </Link>,
  ];
  return (
    <>
      {buttons.map((button, index) => {
        return isMobileNav ? (
          <SheetClose asChild key={index}>
            {button}
          </SheetClose>
        ) : (
          <React.Fragment key={index}>{button}</React.Fragment>
        );
      })}
    </>
  );
};

export default AuthLinks;
