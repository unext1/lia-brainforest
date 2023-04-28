import { NavLink, Outlet } from "@remix-run/react";

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex mt-4 max-w-max">
        <NavLink
          to="/dashboard/settings/profile"
          className={({ isActive }) =>
            isActive
              ? "border-b-red-500 px-4 font-semibold border-b-2 "
              : " px-4 font-semibold  "
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/settings/setup"
          className={({ isActive }) =>
            isActive
              ? "border-b-red-500 px-4 font-semibold border-b-2 "
              : " px-4 font-semibold  "
          }
        >
          Setup
        </NavLink>

        <NavLink
          to="/dashboard/settings/workplaces"
          className={({ isActive }) =>
            isActive
              ? "border-b-red-500 px-4 font-semibold border-b-2 "
              : " px-4 font-semibold  "
          }
        >
          Workplaces
        </NavLink>
      </div>
      <div className="col-span-3 px-10 py-2 mt-2 bg-gray-100 rounded-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
