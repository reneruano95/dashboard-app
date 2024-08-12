"use client";

import { useRouter } from "next/navigation";
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

import { SignIn, SignInSchema } from "@/lib/types";
import { signInWithEmail } from "@/lib/actions/auth";
import { SignInWithProviders } from "./sign-in-with-providers";
import { cn } from "@/lib/utils";

export const SignInForm = () => {
  const router = useRouter();
  const form = useForm<SignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (values: SignIn) => {
    const { email, password } = values;
    const { data, error } = await signInWithEmail({ email, password });

    if (error) {
      return toast.error("Failed to sign in. Please try again.", {
        description: JSON.stringify(error, null, 2),
        descriptionClassName: "text-xs whitespace-pre-line",
      });
    }

    if (data) {
      toast.success("Signed in successfully.", {
        description: "We'll never share your email with anyone else.",
      });
      router.push(`/dashboard/`);
    }
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
            Sign in
            {/* {lastSignedInMethod === "email" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Last used
                </div>
              )} */}
          </Button>
        </form>
      </Form>

      <SignInWithProviders />
    </>
  );
};
