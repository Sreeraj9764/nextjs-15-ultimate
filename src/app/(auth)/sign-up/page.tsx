"use client";
import ProfileForm from "@/components/form/AuthForm";
import { SignUpSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => {
  return (
    <ProfileForm
      schema={SignUpSchema}
      formType={"SIGN-UP"}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
      defaultValues={{ username: "", name: "", email: "", password: "" }}
    />
  );
};

export default SignUp;
