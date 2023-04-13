import {
  redirect,
  type ActionArgs,
  type ActionFunction,
  LoaderFunction,
  LoaderArgs,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await wordpressCookie.parse(cookieHeader)) || {};
  /* const urlExists = ; */
  const url = isValidUrl(values.url as string)
    ? new URL(values.url as string)
    : "";
  const username =
    values.username.length > 0 ? (values.username as string) : "";
  const password =
    values.password.length > 0 ? (values.password as string) : "";
  if (url && username && password) {
    try {
      const f = await fetch(`${url}wp-json/wp/v2/media?media_type=image`);
      (await f.json()) as WPschema[];
      cookie.url = url;
      cookie.username = username;
      cookie.password = password;
      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": await wordpressCookie.serialize(cookie),
        },
      });
    } catch (err) {
      return { error_message: "url is not a wordpress url." };
    }
  }
  const usernameError = `${username.length > 0 ? "" : "username not set"}`;
  const passwordError = `${password.length > 0 ? "" : "password not set"}`;
  const urlError = `${url ? "" : "url not valid"}`;
  return { error_message: [usernameError, passwordError, urlError] };
};
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await wordpressCookie.parse(cookieHeader)) || null;

  if (!cookie) return { cookie: null };
  if (!cookie.url) return { url: null, username: null };
  if (!cookie.username) return { url: null, username: null };

  return { url: cookie.url, username: cookie.username, cookie: true };
};
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString)) && !urlString.endsWith("/");
  } catch (e) {
    return false;
  }
};
export default function Setup() {
  const actionData = useActionData();
  const loaderData = useLoaderData();
  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-6 mx-10 font-mono md:items-start md:flex-row md:justify-start ">
      <div className=" max-w-[50%] min-h-[200px] flex-1">
        <h2 className="text-2xl font-semibold leading-10 ">Getting started</h2>
        <p>Step 1: Install WP Rest Api Plugin in wordpress plugins.</p>
        <p>
          Step 2: Press the{" "}
          <a className="text-blue-400" href="/jwt-secret-plugin.zip" download>
            download link
          </a>{" "}
          and add the zip file to plugins
        </p>
        <p>Step 3: Enter your wordpress url, username and password </p>
        <img
          src="/setup illustration.png"
          alt="illustration of setup"
          className="hidden md:block"
        />
      </div>
      <div className=" min-h-[200px] max-w-xs ">
        {!loaderData.cookie ? (
          <Form className="flex flex-col gap-2 " method="post">
            <h4 className="text-xl font-semibold">Connect your wordpress</h4>
            <input
              name="url"
              className="mt-2 border rounded-sm"
              placeholder={loaderData.url ? loaderData.url : "wordpress url"}
            />
            <input
              name="username"
              className="border rounded-sm"
              placeholder={
                loaderData.username ? loaderData.username : "username"
              }
            />
            <input
              name="password"
              type="password"
              className="border rounded-sm "
              placeholder="password"
            />
            <button
              className="w-fit duration-150 transform hover:scale-105 flex sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-blue-500 rounded-lg"
              type="submit"
            >
              Log in
            </button>
          </Form>
        ) : (
          <h5>
            Hi there, you are already setup! But feel free to check the steps
            again.
          </h5>
        )}
        {
          <div className="mt-10 text-sm ">
            <p className="">
              *NOTE* We do not use your username and password for anything
              except changing the wordpress image SEO.
            </p>
          </div>
        }
        <div>
          {actionData?.error_message?.map((message: any, id: any) => (
            <p key={id}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
