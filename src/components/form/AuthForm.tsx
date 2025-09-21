"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { ActionResponse } from "../../../types/global";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import logger from "@/lib/logger";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  formType: "SIGN-IN" | "SIGN-UP";
  onSubmit: (data: T) => Promise<ActionResponse>;
}

const ProfileForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const router = useRouter();

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast("Success", {
        description: formType === "SIGN-IN" ? "Signed in" : "Signed up",
      });
      router.push(ROUTES.HOME);
    } else {
      toast(`Error ${result.status}`, {
        description: result.error?.message,
      });
    }
  };
  const buttonText = formType === "SIGN-IN" ? "Sign in" : "Sign up";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name.charAt(0).toLocaleUpperCase() +
                    field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="paragraph-regular background-light900_dark300
                     light-border-2 text-dark300_light700 no-focus min-h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign in"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>
        {formType === "SIGN-IN" ? (
          <p>
            Don't have an account ?{" "}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={ROUTES.SIGN_UP}
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={ROUTES.SIGN_IN}
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default ProfileForm;
