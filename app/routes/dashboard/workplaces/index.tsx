import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Btn from "~/components/button";
import { requireUser } from "~/services/auth.server";
import { GetUserWorkplaces } from "~/services/hasura.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const workplaces = await GetUserWorkplaces({
    token: user?.token!,
  });

  return json({ workplaces });
};
export default function Index() {
  const { workplaces } = useLoaderData();

  return (
    <>
      <div className="max-w-[50%] flex flex-col items-center">
        <h1>Your current workplaces</h1>
        {workplaces ? (
          <div>
            {workplaces?.map((workplace: any) => (
              <Link
                to={`/dashboard/workplaces/${workplace.id}`}
                key={workplace.title}
              >
                {workplace.title}
              </Link>
            ))}
          </div>
        ) : (
          <h3>You do not seem to have any active workplaces.</h3>
        )}

        <Btn href="/setup" link title="Create a new workplace here!" />
      </div>
    </>
  );
}
