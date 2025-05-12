"use client";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import next from "next";
import React from "react";
import { boolean } from "zod";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathName = usePathname();
  const userId = 1;

  return (
    <>
      {sidebarLinks.map((link, index) => {
        const isActive =
          pathName.includes(link.route) && pathName === link.route;
        if (link.route === "/profile") {
          if (userId) link.route = `/profile/${userId}`;
          else return null;
        }
        const LinkComponent = (
          <Link
            href={link.route}
            key={link.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-start gap-4 p-4 bg-transparent"
            )}
          >
            <Image
              src={link.imgURL}
              width={20}
              height={20}
              alt={link.label}
              className={cn({ "invert-colors": !isActive })}
            ></Image>
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {link.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={link.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={link.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
