"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/routes/routes";

const SocialAuth = () => {
  const buttonClass = `background-dark400_light900 body-medium 
      text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5`;

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occured during signin"
      );
    }
  };
  return (
    <div className="flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src={"/icons/github.svg"}
          alt={"Github Logo"}
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Login with Github</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src={"/icons/google.svg"}
          alt={"Github Logo"}
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Login with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuth;
