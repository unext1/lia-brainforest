import type { Navigation } from "~/types";
import { DashboardItem } from "./dashboardItem";

export const NavList = ({ navigation }: { navigation: Navigation }) => {
  return (
    <>
      {navigation.map((item) => (
        <DashboardItem key={item.name} item={item} />
      ))}
    </>
  );
};
