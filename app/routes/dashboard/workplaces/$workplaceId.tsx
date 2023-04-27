import { redirect, type LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/services/auth.server";
import { GetWorkplaceById } from "~/services/hasura.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  //const user = await requireUser(request);
  const { workplaceId } = params;
  const workplace = await GetWorkplaceById(workplaceId!);
  if (!workplace) return redirect("/dashboard/workplaces");
  return { workplace };
};
export default function Workplace() {
  const { workplace } = useLoaderData();
  console.log(workplace);
  return (
    <>
      {workplace ? <div>{workplace.title}</div> : ""}
      <Outlet />
    </>
  );
}
