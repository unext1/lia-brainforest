import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/services/auth.server";
import { GetUsersFromWorkplace } from "~/services/hasura.server";
export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);

  const { workplaceId } = params;

  if (workplaceId) {
    const workplaceMembers = await GetUsersFromWorkplace({
      token: user.token,
      workplaceId: workplaceId,
    });
    return json(workplaceMembers);
  }
  return {};
}

export default function Index() {
  const workplaceMembers = useLoaderData();
  return (
    <div>
      <div className="mt-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              Workplace Members
            </h1>
            <p className="mt-2 text-sm text-gray-700"></p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block px-3 py-2 text-sm font-semibold text-center text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="flow-root mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workplaceMembers
                    ? workplaceMembers.map((i: any) => (
                        <tr key={i.workplaceMember.email}>
                          <td className="py-5 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-0">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-11 w-11">
                                <img
                                  className="rounded-full h-11 w-11"
                                  src={i.workplaceMember.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {i.workplaceMember.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                            <div className="mt-1 text-gray-500">
                              {i.workplaceMember.email}
                            </div>
                          </td>
                          <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20">
                              Active
                            </span>
                          </td>

                          <td className="relative py-5 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                            <a
                              href="/"
                              className="text-red-600 hover:text-red-900"
                            >
                              Edit
                              <span className="sr-only">
                                , {i.workplaceMember.name}
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
