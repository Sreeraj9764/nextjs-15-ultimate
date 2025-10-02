"use client";
import ProfileForm from "@/components/form/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validations";
import React from "react";
import { FieldValues } from "react-hook-form";

const SignIn = () => {
  return (
    <ProfileForm
      schema={SignInSchema}
      formType={"SIGN-IN"}
      onSubmit={signInWithCredentials}
      defaultValues={{ email: "", password: "" }}
    />
  );
};

export default SignIn;
