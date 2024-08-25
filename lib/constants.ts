import { SidebarPages } from "./types";

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
