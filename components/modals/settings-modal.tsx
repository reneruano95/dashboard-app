import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import { useDialog } from "@/lib/hooks/use-dialog";
import { MyAccount } from "@/components/settings/my-account";

export const SettingsModal = () => {
  const dialog = useDialog();
  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onClose}>
      <DialogContent className="p-0 max-w-5xl h-full md:h-[650px]">
        <div className="flex w-full mx-auto border rounded-lg overflow-hidden">
          <SettingsSidebar />

          <main className="flex-1 bg-background p-6 flex flex-col justify-center">
            <div className="space-y-6">
              <MyAccount />
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};
