import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/global/icon";

export const SignInForm = () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground/90">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link
            href="#"
            className="font-medium text-foreground/80 hover:text-primary/90"
            prefetch={false}
          >
            sign up for a new account
          </Link>
        </p>
      </div>
      <form
        className="space-y-6"
        method="post"
        // action={signInWithEmail}
      >
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <Button
            type="submit"
            className="relative flex w-full justify-center rounded-md bg-foreground py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Sign in
            {/* {lastSignedInMethod === "email" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Last used
                </div>
              )} */}
          </Button>
        </div>
      </form>
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
        <form
          method="post"
          //   action={signInWithGitHub}
        >
          <Button
            variant="outline"
            className="relative flex w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            disabled
          >
            <Icon name="Github" className=" mr-2 h-5 w-5" />
            Sign in with GitHub
            {/* {lastSignedInMethod === "github" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Last used
                </div>
              )} */}
          </Button>
        </form>
        <form
          method="post"
          //   action={signInWithGoogle}
        >
          <Button
            variant="outline"
            className="relative flex w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            disabled
          >
            <Icon name="Chrome" className=" mr-2 h-5 w-5" />
            Sign in with Google
            {/* {lastSignedInMethod === "google" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Last used
                </div>
              )} */}
          </Button>
        </form>
      </div>
    </div>
  );
};
