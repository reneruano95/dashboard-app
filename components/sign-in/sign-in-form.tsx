"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

import { SignIn } from "@/lib/types";
import { SignInSchema } from "@/lib/types/validations";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/auth/use-auth";

export const SignInForm = () => {
  const { signIn } = useAuth();

  const form = useForm<SignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (values: SignIn) => {
    const { email, password } = values;

    toast.promise(signIn.mutateAsync({ email, password }), {
      loading: "Signing in...",
      success: () => {
        return "Signed in successfully.";
      },
      error: (error) => {
        return `Failed to sign in. ${error.message}`;
      },
    });
  };

  return (
    <>
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
                    We&apos;ll never share your email with anyone else.
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
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
};
