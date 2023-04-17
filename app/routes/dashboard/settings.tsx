import { LoaderArgs, json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { wordpressCookie } from "~/cookie";

export async function loader({ request, params }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
  console.log(cookie);

  return json(cookie);
}

const Settings = () => {
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
          <div>
            <Link to="/dashboard/settings" className="font-semibold">
              Logout
            </Link>
          </div>
        </div>
        <div className="col-span-3 p-10 mt-20 bg-gray-100 rounded-xl">
          <h2 className="font-semibold">Account details</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
