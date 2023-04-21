import { type LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { wordpressCookie } from "~/cookie";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);

  return json(cookie);
};
const Workspaces = () => {
  const cookie = useLoaderData();
  const list = [cookie.title, cookie.title, cookie.title, cookie.title];
  return (
    <div className="w-[80%]">
      <div className="flex justify-between w-full px-1 pb-2 border-b border-b-gray-300">
        <p>Name</p>
        <div className="flex gap-10">
          <p>Last changed</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2 ">
        {list.map((workspace) => (
          <Link
            key={workspace}
            className="flex items-center justify-between w-full gap-1 p-1 border-b rounded-sm group border-b-gray-200 hover:border-b-gray-300 "
            to={`/dashboard/settings/workspaces/${workspace}`}
          >
            <h4 className="font-semibold ">{workspace}</h4>
            <p>Mar 14,2023</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Workspaces;