import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import DashboardTitle from "~/components/dashboardTitle";
import { requireUser } from "~/services/auth.server";
import { GetUserWorkplaces, RemoveWorkplace } from "~/services/hasura.server";
import { type TWorkplace } from "~/types";

import type { ActionArgs } from "@remix-run/node";
import WorkplaceCard from "~/components/workplaceCard";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { workplaceId } = Object.fromEntries(formData);
  if (workplaceId) {
    await RemoveWorkplace(workplaceId as string);
    return { deleted: true };
  }

  return {};
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const workplaces = await GetUserWorkplaces({
    token: user?.token!,
  });

  return json({ workplaces, user });
};
export default function Index() {
  const { workplaces, user } = useLoaderData<typeof loader>();

  return (
    <>
      <DashboardTitle title="Your Workplaces" />
      <div className="grid grid-cols-1 gap-10 mb-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        {workplaces ? (
          workplaces.map((workplace: TWorkplace) => (
            <WorkplaceCard
              key={workplace.id}
              workplace={workplace}
              remove={workplace.ownerId === user.id}
            />
          ))
        ) : (
          <p>U dont have any workplaces...</p>
        )}
      </div>
      <div className="mt-6">
        <Link
          to="/dashboard/workplaces/add"
          className="flex px-6 py-2 text-xs font-bold text-white uppercase duration-150 transform bg-red-500 rounded-lg w-fit hover:scale-105 sm:px-8 sm:py-2 md:text-sm"
        >
          Create New Workplace
        </Link>
      </div>
    </>
  );
}
