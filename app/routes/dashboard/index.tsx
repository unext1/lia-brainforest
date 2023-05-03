import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import DashboardTitle from "~/components/dashboardTitle";
import { requireUser } from "~/services/auth.server";
import { GetUserWorkplaces } from "~/services/hasura.server";
import { TWorkplace } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const workplaces = await GetUserWorkplaces({
    token: user?.token!,
  });

  return json({ workplaces, user });
};

const Dashboard = () => {
  const { workplaces, user } = useLoaderData<typeof loader>();

  return (
    <div>
      <DashboardTitle title="Dashboard" />
      <div className="">
        <div className="flex py-4 space-x-1 text-xl">
          <h2 className="font-semibold text-red-500">Your </h2>
          <h2>profile</h2>
        </div>
        <div className="relative w-64 overflow-hidden bg-white rounded-lg shadow-md">
          <div className="bg-[#00bd76] h-20"></div>

          <div className="p-4">
            <img
              src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              alt="Profile"
              className="w-20 h-20 mx-auto mb-2 transform border-2 border-white rounded-full -translate-y-2/3"
              style={{ marginBottom: "-2rem" }}
            />
            <h1 className="mt-0 text-xl font-semibold text-center">
              {user.name}
            </h1>
            <p className="text-center text-gray-600">{user.email}</p>
            <div className="flex justify-around mt-4"></div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex py-4 space-x-1 text-xl">
          <h2 className="font-semibold text-red-500">Your </h2>
          <h2>workplaces</h2>
        </div>
        <div className="grid grid-cols-1 gap-10 mb-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {workplaces
            ? workplaces.map((workplace: TWorkplace) => (
                <div
                  className="w-full h-full p-5 bg-gray-50 rounded-xl"
                  key={workplace.id}
                >
                  <Link to={`/dashboard/workplaces/${workplace.id}`}>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-16 h-16 fill-red-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                      </svg>
                      {/* <Form method="post" className="w-full">
                <input name="id" value={workplace.id} type="hidden" />
                <button
                  type="submit"
                  className="w-full text-right text-red-500"
                >
                  X
                </button>
              </Form> */}
                    </div>
                  </Link>

                  <div className="mt-4">
                    <h2 className="mt-1 text-sm font-semibold uppercase">
                      {workplace.title}
                    </h2>

                    <div className="flex justify-between w-full mt-5 text-xs">
                      <div className="">
                        <p className="">Created At</p>
                        <p>
                          {new Date(workplace.createdAt).toLocaleDateString(
                            "en-GB"
                          )}{" "}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>Updated At</p>
                        <p>
                          {new Date(workplace.updatedAt).toLocaleDateString(
                            "en-GB"
                          )}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
