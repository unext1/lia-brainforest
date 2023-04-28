import {
  redirect,
  type ActionArgs,
  type ActionFunction,
  type LoaderFunction,
  json,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { SetupComponent } from "~/components/setup";
import { redirectUser, requireUser } from "~/services/auth.server";
import { CreateWorkplace } from "~/services/hasura.server";
import type { TTokenData } from "~/types";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const user = await requireUser(request);
  if (!user) return redirect("/login");
  const url = isValidUrl(values.url as string)
    ? new URL(values.url as string)
    : "";
  const username =
    (values.username as string).length > 0 ? (values.username as string) : "";
  const password =
    (values.password as string).length > 0 ? (values.password as string) : "";
  let error_url = "";
  let error_username = "";
  let error_password = "";
  if (!url) error_url = "incorrect url";
  if (!username) error_username = "incorrect username";
  if (!password) error_password = "incorrect password";

  if (url && username && password) {
    try {
      const wordpress_user = {
        username,
        password,
      };
      const tokenResponse = await fetch(`${url}wp-json/jwt-auth/v1/token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(wordpress_user),
      });
      const tokenData: TTokenData = await tokenResponse.json();
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
      const workplace = await CreateWorkplace(
        user?.id!,
        tokenData.token!,
        url.toString(),
        titleData.title
      );

      return redirect(`/dashboard/workplaces/${workplace.id}`, {});
    } catch (err) {
      return { error_url: "incorrect url" };
    }
  } else {
    return json({ error_url, error_username, error_password });
  }
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return user;
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
  console.log(data);

  return (
    <div className="h-screen ">
      <div className="grid h-full grid-cols-1 gap-20 p-6 lg:grid-cols-2">
        <SetupComponent />
        <div className="flex flex-col justify-center h-full px-40">
          <h2 className="text-3xl font-semibold tracking-wide">
            Setup your workplace.
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            To create a workplace and change SEO on images you need to follow
            the steps on the left.
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
                    data?.error_url.length > 0 ? "block" : "hidden"
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
                    data?.error_username.length > 0 ? "block" : "hidden"
                  } mt-1 text-red-500`}
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
                    data?.error_password.length > 0 ? "block " : " hidden"
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
