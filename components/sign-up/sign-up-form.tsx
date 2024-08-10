"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SignInValues } from "@/lib/types";
import { SignInSchema } from "@/lib/types/sign-in-schema";
import { cn } from "@/lib/utils";
import { signUpWithEmail } from "@/lib/server-actions/auth";

export const SignUpForm = () => {
  const form = useForm<SignInValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (values: SignInValues) => {
    const { email, password } = values;
    const { error } = await signUpWithEmail({ email, password });

    if (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm space-y-8">
      <div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground/90">
          Sign up for a new account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground/80 hover:text-primary/90"
            prefetch={false}
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="email" className="sr-only">
                  Email address
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    className={cn(
                      form.formState.errors.email &&
                        "focus-visible:ring-red-500"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
                {!form.formState.errors.email && (
                  <FormDescription className="text-xs">
                    We'll never share your email with anyone else.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="password" className="sr-only">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className={cn(
                      form.formState.errors.password &&
                        "focus-visible:ring-red-500"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
                {!form.formState.errors.password && (
                  <FormDescription className="text-xs">
                    Must be at least 6 characters long.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" className="relative w-full">
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
};
