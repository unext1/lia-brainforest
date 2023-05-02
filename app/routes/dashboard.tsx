import {
  json,
  type ActionArgs,
  redirect,
  type LoaderArgs,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { MobileSidebar } from "~/components/dashboard/mobileSidebar";
import { Sidebar } from "~/components/dashboard/sidebar";
import { requireUser } from "~/services/auth.server";
import { GetUserWorkplaces } from "~/services/hasura.server";
import type { TWorkplace } from "~/types";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { workplace } = Object.fromEntries(formData);

  if (!workplace) return null;
  if (workplace === "create-new") return redirect("/setup");
  return redirect(`/dashboard/workplaces/${workplace}`);
}
export const loader = async ({ request, params }: LoaderArgs) => {
  const { workplaceId } = params;

  const user = await requireUser(request);
  const workplaces = await GetUserWorkplaces({ token: user?.token! });
  if (workplaceId) {
    const workplace = workplaces.filter((value) => value.id === workplaceId)[0];
    return json({ workplaces, workplace });
  }
  return json({ workplaces });
};
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loaderData = useLoaderData<{
    workplaces: TWorkplace[];
    workplace: TWorkplace;
  }>();
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard/workplaces",
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
    loaderData?.workplace && {
      name: "Images",
      href: `/dashboard/workplaces/${loaderData?.workplace?.id}/images?page=1`,
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
  return (
    <>
      <div>
        <MobileSidebar
          setState={setSidebarOpen}
          state={sidebarOpen}
          navigation={navigation}
          workplaces={loaderData.workplaces}
        />
        <Sidebar
          setState={setSidebarOpen}
          state={sidebarOpen}
          navigation={navigation}
          workplaces={loaderData.workplaces}
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
