import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { wordpressCookie } from "~/cookie";
import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { Sidebar } from "~/components/dashboard/sidebar";
import { MobileSidebar } from "~/components/dashboard/mobileSidebar";
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 my-auto"
      >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    ),
  },
  {
    name: "All Images",
    href: "/dashboard/images?page=1",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 my-auto"
      >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    ),
  },
];

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);

  if (!cookie) return redirect("/setup");
  return json(cookie);
}
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cookie = useLoaderData();
  return (
    <>
      <div>
        <MobileSidebar
          setState={setSidebarOpen}
          state={sidebarOpen}
          navigation={navigation}
          cookie={cookie}
        />
        <Sidebar
          cookie={cookie}
          setState={setSidebarOpen}
          state={sidebarOpen}
          navigation={navigation}
        />
        <div className="lg:pl-72">
          <main>
            <div className="px-4 pt-5 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
