import { ReactNode } from "react";
import { TabsContent } from "../ui/tabs";
import { LanguageRegion } from "../settings/account-settings/language-region";
import { MyAccount } from "../settings/account-settings/my-account";
import { MySettings } from "../settings/account-settings/my-settings";
import { Notifications } from "../settings/account-settings/notifications";

type TabMenu = {
  value: string;
  content: ReactNode;
};

export const tabMenuContent: TabMenu[] = [
  {
    value: "My account",
    content: <MyAccount />,
  },
  {
    value: "My settings",
    content: <MySettings />,
  },
  {
    value: "Notifications",
    content: <Notifications />,
  },
  {
    value: "Language & region",
    content: <LanguageRegion />,
  },
];

export const TabMenuContent = () => {
  return (
    <>
      {tabMenuContent.map(({ value, content }) => (
        <TabsContent key={value} value={value} className="mt-0">
          {content}
        </TabsContent>
      ))}
    </>
  );
};
