import Link from "next/link";
import Image from "next/image";
import { Icon } from "../global/icon";

import logoImage from "@/public/logo.80111550.webp";
import { AspectRatio } from "../ui/aspect-ratio";

export const Sidebar = () => {
  return (
    <aside className="hidden h-full w-64 bg-white border-r border-gray-200 md:block dark:bg-background dark:border-neutral-700">
      <div className="relative flex flex-col h-full max-h-full">
        <div className=" px-6 mx-3 mt-3 dark:bg-white rounded-lg">
          <AspectRatio ratio={16 / 5}>
            <Image
              src={logoImage}
              alt="Logo"
              className="object-contain w-full h-full rounded-lg dark:filter"
              quality={100}
            />
          </AspectRatio>
        </div>

        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <nav className="p-3 w-full flex flex-col flex-wrap">
            <ul className="flex flex-col space-y-1">
              <li>
                <Link
                  className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                  href="#"
                >
                  <Icon name="LayoutDashboard" className="w-5 h-5" />
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};
