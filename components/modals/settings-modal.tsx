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

export const SettingsModal = () => {
  const dialog = useDialog();
  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onClose}>
      <DialogContent className="p-0 max-w-5xl">
        <div className="flex h-[600px] w-full max-w-6xl mx-auto border rounded-lg overflow-hidden">
          <aside className="w-64 bg-muted border-r">
            <ScrollArea className="h-full py-6 px-4">
              <h2 className="text-lg font-semibold mb-4">FIG@MAKENOTION.COM</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  My account
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  My notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  My connected apps
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Language & region
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Appearance
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Earn credit
                </Button>
              </div>
              <Separator className="my-4" />
              <h3 className="text-sm font-medium mb-2">WORKSPACE</h3>
              <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start">
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Members
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Plans
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Billing
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Security & identity
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Integrations
                </Button>
              </div>
            </ScrollArea>
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
