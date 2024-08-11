import { Icon } from "../global/icon";
import { Button } from "../ui/button";

export const SignInWithProviders = () => {
  return (
    <>
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
    </>
  );
};
