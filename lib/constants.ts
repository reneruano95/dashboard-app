import { SidebarApps, SidebarPages } from "./types";

export const sidebarPages: SidebarPages[] = [
  {
    label: "Pages",
    children: [
      {
        title: "Estimates",
        icon: "NotebookTabs",
        href: "/estimates",
        roles: ["admin", "agency_owner", "agency_user"],
      },
      {
        title: "Invoices",
        icon: "SquareChartGantt",
        href: "/invoices",
        roles: ["admin", "agency_owner", "agency_user"],
      },
      {
        title: "Customers",
        icon: "Users",
        href: "/customers",
        roles: ["admin", "agency_owner", "agency_user"],
      },
      {
        title: "Products",
        icon: "ShoppingCart",
        href: "/products",
        roles: ["admin", "agency_owner", "agency_user"],
      },
      {
        title: "Agencies",
        icon: "Building2",
        href: "/agencies",
        roles: ["admin"],
      },
      {
        title: "Users",
        icon: "Users",
        href: "/users",
        roles: ["admin"],
      },
    ],
  },
];

export const sidebarApps: SidebarApps[] = [
  {
    label: "Apps",
    children: [
      {
        title: "To-dos",
        icon: "ListTodo",
        href: "/apps/to-dos",
      },
      {
        title: "KanBan",
        icon: "Kanban",
        href: "/apps/kanban",
      },
      {
        title: "Automation",
        icon: "Workflow",
        href: "/apps/automation",
      },
      {
        title: "Calendar",
        icon: "Calendar",
        href: "/apps/calendar",
      },
    ],
  },
];
