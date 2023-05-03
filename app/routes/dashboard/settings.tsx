import { NavLink, Outlet } from "@remix-run/react";
import DashboardTitle from "~/components/dashboardTitle";

const nav = [
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
  },

  {
    name: "Workplaces",
    href: "/dashboard/settings/workplaces",
  },
];

const Settings = () => {
  return (
    <div>
      <DashboardTitle title="Settings" />
      <div className="flex mb-5 max-w-max">
        {nav.map((navItem) => (
          <NavLink
            key={navItem.name}
            to={navItem.href}
            className={({ isActive }) =>
              isActive
                ? "border-b-red-500 mr-4  text-sm border-b-4 "
                : "  text-sm  mr-4"
            }
          >
            {navItem.name}
          </NavLink>
        ))}
      </div>
      <div className="col-span-3 px-10 py-2 mt-2 bg-white-100 rounded-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
