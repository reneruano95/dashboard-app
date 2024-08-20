import { InfoIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDialog } from "@/lib/hooks/use-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Icon } from "../global/icon";

export const SettingsModal = () => {
  const dialog = useDialog();
  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onClose}>
      <DialogContent className="p-0 max-w-5xl">
        <div className="flex h-[600px] w-full max-w-6xl mx-auto border rounded-lg overflow-hidden">
          <aside className="w-56 bg-muted border-r py-3 px-2">
            <h2 className="text-base font-semibold mb-3">FIG@MAKENOTION.COM</h2>
            <div className="flex flex-col gap-[1px] text-muted-foreground">
              <h3 className="mb-1 text-xs font-semibold text-zinc-500">
                Account
              </h3>
              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="CircleUser" className="w-5 h-5" />
                <span>My account</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="SlidersHorizontal" className="w-5 h-5" />
                <span>My settings</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="BellDot" className="w-5 h-5" />
                <span>My notifications</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="Globe" className="w-5 h-5" />
                <span>Language & region</span>
              </Button>
            </div>

            <Separator className="my-4" />
            <h3 className="mb-1 text-xs font-semibold text-zinc-500">Agency</h3>
            <div className="flex flex-col gap-[1px] text-muted-foreground">
              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="Settings" className="w-5 h-5" />
                <span>Settings</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="Users" className="w-5 h-5" />
                <span>Members</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="Building2" className="w-5 h-5" />
                <span>Teamspaces</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="WalletCards" className="w-5 h-5" />
                <span>Billing</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name="Workflow" className="w-5 h-5" />
                <span>Integrations</span>
              </Button>
            </div>
          </aside>

          <main className="flex-1 bg-background">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Domain</h2>
                <div className="space-y-2">
                  <Label htmlFor="domain">www.notion.so/</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="domain" placeholder="acmeincorporated" />
                    <Button>Change</Button>
                  </div>
                </div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Allowed email domains</CardTitle>
                    <CardDescription>
                      Anyone with email addresses at these domains can
                      automatically join your workspace.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="bg-muted text-muted-foreground px-2 py-1 rounded-md flex items-center">
                        makenotion.com
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-2 text-muted-foreground"
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Add another domain"
                        className="flex-1"
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Export content</h3>
                  <Button>Export all workspace content</Button>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <InfoIcon className="h-4 w-4" />
                    <span>Learn about exporting workspaces.</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Export members</h3>
                  <Button variant="outline">Export members as CSV</Button>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update</Button>
                </div>
              </div>
            </ScrollArea>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};
