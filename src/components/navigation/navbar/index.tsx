import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";
import { User } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/auth";
const NavBar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <nav className="flex-between fixed gap-5 background-light900_dark200  top-0 z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        ></Image>
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <p>Global search</p>
      <div className="flex-between gap-5">
        <Theme />
        {userId && (
          <UserAvatar
            userId={userId}
            name={session.user?.name!}
            imageUrl={session.user?.image}
          />
        )}
      </div>

      <MobileNavigation />
    </nav>
  );
};

export default NavBar;
