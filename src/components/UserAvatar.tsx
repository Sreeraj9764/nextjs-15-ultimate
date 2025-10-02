import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";

const UserAvatar = ({
  userId,
  name,
  imageUrl,
  className = "h-9 w-9",
}: {
  userId: string;
  name: string;
  imageUrl: string | null | undefined;
  className?: string;
}) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <Link href={ROUTES.PROFILE(userId)}>
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-full"
            width={36}
            height={36}
            quality={100}
          ></Image>
        ) : (
          <AvatarFallback
            className="w-full h-full primary-gradient font-space-grotesk
           font-bold tracking-wider text-white flex items-center justify-center"
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
