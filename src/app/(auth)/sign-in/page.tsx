"use client";
import ProfileForm from "@/components/form/AuthForm";
import { SignInSchema } from "@/lib/validations";
import React from "react";
import { FieldValues } from "react-hook-form";

const SignIn = () => {
  return (
    <ProfileForm
      schema={SignInSchema}
      formType={"SIGN-IN"}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
      defaultValues={{ email: "", password: "" }}
    />
  );
};

export default SignIn;
