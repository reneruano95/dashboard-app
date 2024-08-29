import { icons } from "lucide-react";

export type MenuItem = {
  icon: keyof typeof icons;
  label: string;
};

export const menuItemsAccount: MenuItem[] = [
  { icon: "User", label: "My account" },
  { icon: "SlidersHorizontal", label: "My settings" },
  { icon: "BellDot", label: "Notifications" },
  { icon: "Globe", label: "Language & region" },
];

export const menuItemsAgency: MenuItem[] = [
  { icon: "Settings", label: "Settings" },
  { icon: "Users", label: "Members" },
  { icon: "Building2", label: "Teamspaces" },
  { icon: "WalletCards", label: "Billing & Invoices" },
  { icon: "Workflow", label: "Integrations" },
];
