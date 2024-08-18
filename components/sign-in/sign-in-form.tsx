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

import { SignIn } from "@/lib/types";
import { SignInSchema } from "@/lib/types/validations";
import { SignInWithProviders } from "./sign-in-with-providers";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";

export const SignInForm = () => {
  const router = useRouter();
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
        router.push(`/dashboard/`);
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
