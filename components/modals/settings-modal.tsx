import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SettingsSidebar } from "../settings/settings-sidebar";
import { useDialog } from "@/lib/hooks/use-dialog";
import { Switch } from "../ui/switch";
import { Icon } from "../global/icon";

export const SettingsModal = () => {
  const dialog = useDialog();
  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onClose}>
      <DialogContent className="p-0 max-w-5xl h-full md:h-[650px]">
        <div className="flex w-full mx-auto border rounded-lg overflow-hidden">
          <SettingsSidebar />

          <main className="flex-1 bg-background p-6 flex flex-col justify-center">
            <div className="space-y-6">
              <DialogHeader className="text-left">
                <DialogTitle className="text-lg font-bold">
                  My account
                </DialogTitle>
                <DialogDescription>
                  Update your profile information.
                </DialogDescription>
                <Separator className="mt-2" />
              </DialogHeader>

              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="size-[60px] rounded-full bg-neutral-600 flex items-center justify-center text-xl text-primary-foreground">
                      R
                    </div>
                  </div>

                  {/*   */}
                  <div className="ml-4 w-64">
                    <label
                      htmlFor="preferred-name"
                      className="block text-sm font-medium mb-1"
                    >
                      Preferred name
                    </label>
                    <Input
                      id="preferred-name"
                      defaultValue="Rene Ruano"
                      className="max-w-md text-sm py-1 px-2 h-fit"
                    />
                  </div>
                </div>

                <div className="h-fit mt-2 text-sm">Add photo</div>
              </div>

              {/*   */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">Account security</h2>
                <Separator className="my-2" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        rene.ruano95@gmail.com
                      </p>
                    </div>
                    <Button variant="outline" className="h-fit px-3">
                      Change email
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Set a permanent password to login to your account.
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">2-step verification</p>
                      <p className="text-sm text-muted-foreground">
                        Add an additional layer of security to your account
                        during login.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              {/*   */}

              <div className="flex flex-col">
                <h2 className="text-lg font-bold">Support</h2>
                <Separator className="my-2" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Support access</p>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Allow support to access your account to help with
                        issues.
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-500">
                        Delete my account
                      </p>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Permanently delete the account and remove access from
                        all workspaces.
                      </p>
                    </div>
                    <Icon name="ChevronRight" className="size-5" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};
