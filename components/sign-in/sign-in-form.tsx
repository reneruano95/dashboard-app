"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Icon } from "@/components/global/icon";

import { SignInValues } from "@/lib/types";
import { SignInSchema } from "@/lib/types/sign-in-schema";
import { cn } from "@/lib/utils";
import { signInWithEmail } from "@/lib/server-actions/auth";
import { toast } from "sonner";

export const SignInForm = () => {
  const router = useRouter();
  const form = useForm<SignInValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (values: SignInValues) => {
    const { email, password } = values;
    const { error } = await signInWithEmail({ email, password });

    toast.promise(signInWithEmail({ email, password }), {
      loading: "Signing in...",
      success: "Signed in successfully",
      error: `Failed to sign in: ${error ? error.message : ""}`,
    });

    router.push("/dashboard");
  };

  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm space-y-8">
      <div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold tracking-tight text-foreground/90">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link
            href="/sign-up"
            className="font-medium text-foreground/80 hover:text-primary/90"
            prefetch={false}
          >
            sign up for a new account
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
            Sign in
            {/* {lastSignedInMethod === "email" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Last used
                </div>
              )} */}
          </Button>
          {/* <ModeToggle /> */}
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="flex w-full items-center justify-center"
          disabled
        >
          <Icon name="Github" className="mr-2 h-5 w-5" />
          Sign in with GitHub
          {/* {lastSignedInMethod === "github" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Last used
                </div>
              )} */}
        </Button>

        <Button
          variant="outline"
          className="flex w-full items-center justify-center"
          disabled
        >
          <Icon name="Chrome" className="mr-2 h-5 w-5" />
          Sign in with Google
          {/* {lastSignedInMethod === "google" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Last used
                </div>
              )} */}
        </Button>
      </div>
    </div>
  );
};
