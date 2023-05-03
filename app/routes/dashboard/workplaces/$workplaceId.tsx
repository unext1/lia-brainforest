import { redirect, type LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import DashboardTitle from "~/components/dashboardTitle";
import { requireUser } from "~/services/auth.server";
import { GetWorkplaceById } from "~/services/hasura.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);

  const { workplaceId } = params;
  const workplace = await GetWorkplaceById(workplaceId!);
  if (!workplace) return redirect("/dashboard/workplaces");
  return { workplace };
};
export default function Workplace() {
  const { workplace } = useLoaderData();
  return (
    <>
      <DashboardTitle title={`${workplace.title}`} />

      <Outlet />
    </>
  );
}
