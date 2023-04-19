import { LoaderArgs, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { wordpressCookie } from "~/cookie";

export async function loader({ request, params }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);

  return json(cookie);
}

const Settings = () => {
  const cookie = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="grid grid-cols-4 gap-20">
        <div className="p-10 mt-20 space-y-2 bg-gray-100 rounded-xl">
          <div>
            <Link to="/dashboard/settings" className="font-semibold">
              Profile
            </Link>
          </div>
          <div>
            <Link to="/dashboard/settings" className="font-semibold">
              Setup
            </Link>
          </div>
        </div>
        <div className="col-span-3 p-10 mt-20 bg-gray-100 rounded-xl">
          <h2 className="font-semibold">Account details</h2>
          <div>
            <p className="font-medium ">Wordpress url </p>
            <p className="p-1 border rounded-sm shadow-inner max-w-max">
              {cookie.url}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-10">
        <Form method="post" action="/logout">
          <button type="submit">Logout</button>
        </Form>
      </div>
    </div>
  );
};

export default Settings;
