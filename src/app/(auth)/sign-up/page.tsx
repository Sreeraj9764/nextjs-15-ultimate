"use client";
import ProfileForm from "@/components/form/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";
import { sign } from "crypto";
import React from "react";

const SignUp = () => {
  return (
    <ProfileForm
      schema={SignUpSchema}
      formType={"SIGN-UP"}
      onSubmit={signUpWithCredentials}
      defaultValues={{ username: "", name: "", email: "", password: "" }}
    />
  );
};

export default SignUp;
