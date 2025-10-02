import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Span } from "next/dist/trace";
import NavLinks from "./NavLinks";
import AuthLinks from "../AuthLinks";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        ></Image>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none px-2 pb-4"
      >
        <SheetHeader>
          <SheetTitle className="hidden">Navigation</SheetTitle>
        </SheetHeader>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src="images/site-logo.svg"
            width={23}
            height={23}
            alt="Home"
            className="invert-colors"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div
          className="flex no-scrollbar h-[calc(100vh-80px)]
        flex-col justify-between overflow-y-auto"
        >
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav userId={userId} />
            </section>
          </SheetClose>
        </div>
        <div
          className="flex
        flex-col gap-3"
        >
          {/* <SheetClose asChild>
            <Link href={ROUTES.SIGN_IN}>
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
                <span className="primary-text-gradient"> Log In</span>
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                Sign up
              </Button>
            </Link>
          </SheetClose> */}
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
              <AuthLinks isMobileNav />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
