import { Icon } from "../global/icon";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const SettingsSidebar = () => {
  return (
    <aside className="w-56 bg-muted border-r py-3 px-2">
      <h2 className="text-base font-semibold mb-3">FIG@MAKENOTION.COM</h2>
      <div className="flex flex-col gap-[1px] text-muted-foreground">
        <h3 className="mb-1 text-xs font-semibold text-zinc-500">Account</h3>
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
  );
};
