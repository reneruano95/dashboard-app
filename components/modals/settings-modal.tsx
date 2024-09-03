import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabMenuVertical } from "@/components/settings/tab-menu-vertical";
import { useDialog } from "@/lib/hooks/modals/use-dialog";
import { TabMenuHorizontal } from "../settings/tab-menu-horizontal";

export const SettingsModal = () => {
  const { isOpen, onClose } = useDialog();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-5xl h-full md:h-[650px]">
        <div className="flex flex-col md:flex-row w-full mx-auto border rounded-lg overflow-hidden">
          <TabMenuVertical />
          <TabMenuHorizontal />
        </div>
      </DialogContent>
    </Dialog>
  );
};
