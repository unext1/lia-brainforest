//Description: This is the setup page for the app. It is used to setup the wordpress url, username and password.
import {
  redirect,
  type ActionArgs,
  type ActionFunction,
  type LoaderFunction,
  json,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { SetupComponent } from "~/components/setup";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await wordpressCookie.parse(cookieHeader)) || {};
  const url = isValidUrl(values.url as string)
    ? new URL(values.url as string)
    : "";
  const username =
    (values.username as string).length > 0 ? (values.username as string) : "";
  const password =
    (values.password as string).length > 0 ? (values.password as string) : "";
  if (!url) return json({ error_url: "incorrect url" });
  if (!username) return json({ error_username: "incorrect username" });
  if (!password) return json({ error_password: "incorrect password" });
  if (url && username && password) {
    try {
      const f = await fetch(`${url}wp-json/wp/v2/media?media_type=image`);
      (await f.json()) as WPschema[];
      const user = {
        username,
        password,
      };
      const tokenResponse = await fetch(`${url}wp-json/jwt-auth/v1/token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(user),
      });
      const tokenData = await tokenResponse.json();
      const titleResponse = await fetch(
        `${url}wp-json/wp/v2/settings?context=view`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          method: "GET",
        }
      );
      const titleData = await titleResponse.json();

      if (tokenData.code)
        if (tokenData.code === "[jwt_auth] incorrect_password")
          return json({
            error_password: "incorrect password",
          });
        else {
          return json({
            error_username: "incorrect username",
          });
        }

      cookie.title = titleData.title;
      cookie.token = tokenData.token;
      cookie.url = url;

      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": await wordpressCookie.serialize(cookie),
        },
      });
    } catch (err) {
      return { error_url: "incorrect url" };
    }
  }
};
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await wordpressCookie.parse(cookieHeader)) || null;

  if (cookie !== null) {
    return redirect("/dashboard");
  }

  return null;
};
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
export default function Setup() {
  const data = useActionData();

  return (
    <div className="h-screen ">
      <div className="grid h-full grid-cols-1 gap-20 p-10 lg:grid-cols-2">
        <SetupComponent />
        <div className="flex flex-col justify-center h-full px-40">
          <h2 className="text-3xl font-semibold tracking-wide">
            Setup your account.
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repellendus animi hic maiores laudantium corrupti nostrum
          </p>

          <Form method="post" className="mt-4">
            <div className="flex flex-col w-full gap-2">
              <div className="mt-4 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Wordpress Url
                </label>
                <div className="relative mt-1">
                  <input
                    name="url"
                    type="text"
                    className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-500"
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={`${
                    data?.error_url ? "block" : "hidden"
                  } mt-1 text-red-500 `}
                >
                  {data?.error_url}
                </p>
              </div>
              <div className="mt-4 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="relative mt-1">
                  <input
                    name="username"
                    type="text"
                    className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-500"
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={`${
                    data?.error_username ? "block" : "hidden"
                  } mt-1 text-red-500 `}
                >
                  {data?.error_username}
                </p>
              </div>
              <div className="mt-4 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    name="password"
                    type="password"
                    className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-500"
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={`${
                    data?.error_password ? "block" : "hidden"
                  } mt-1 text-red-500 `}
                >
                  {data?.error_password}
                </p>
              </div>

              <button
                className="w-full duration-150 transform hover:scale-95 sm:px-16 sm:py-2.5 mt-2 text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
                type="submit"
              >
                Log in
              </button>
            </div>
          </Form>
        </div>
      </div>
      {/*  <div
        className="flex justify-end gap-2"
        dangerouslySetInnerHTML={{ __html: data ? data.error_message : null }}
      ></div> */}
    </div>
  );
}
