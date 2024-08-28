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

export const SettingsModal = () => {
  const dialog = useDialog();
  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onClose}>
      <DialogContent className="p-0 max-w-5xl">
        <div className="flex h-[600px] w-full max-w-7xl mx-auto border rounded-lg overflow-hidden">
          <SettingsSidebar />

          <main className="flex-1 bg-background p-6">
            <div className="space-y-6">
              <DialogHeader className="">
                <DialogTitle className="text-lg font-bold">
                  My Profile
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
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};
