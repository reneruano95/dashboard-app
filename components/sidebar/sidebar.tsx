import { Icon } from "../global/icon";

export const Sidebar = () => {
  return (
    <aside className="hidden w-64 bg-white border-r border-gray-200 md:block">
      <div className="relative flex flex-col h-full max-h-full">
        <div className=" px-6 mx-3 mt-3 h-12 bg-slate-700"></div>

        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <nav
            className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
            data-hs-accordion-always-open
          >
            <ul className="flex flex-col space-y-1">
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                  href="#"
                >
                  <Icon name="LayoutDashboard" className="w-5 h-5" />
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};
