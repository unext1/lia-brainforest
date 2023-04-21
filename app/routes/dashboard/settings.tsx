import { type LoaderArgs, json } from "@remix-run/node";
import { Form, NavLink, Outlet } from "@remix-run/react";
import { wordpressCookie } from "~/cookie";

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);

  return json(cookie);
}

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
          to="/dashboard/settings/workspaces"
          className={({ isActive }) =>
            isActive
              ? "border-b-red-500 px-4 font-semibold border-b-2 "
              : " px-4 font-semibold  "
          }
        >
          Workspaces
        </NavLink>
      </div>
      <div className="col-span-3 p-10 bg-gray-100 rounded-xl">
        <Outlet />
      </div>
      <div className="flex justify-end pt-4">
        <Form method="post" action="/logout">
          <button type="submit">Logout</button>
        </Form>
      </div>
    </div>
  );
};

export default Settings;
