import {
  json,
  redirect,
  type ActionArgs,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { btoa } from "@remix-run/node/dist/base64";
import { Form, useActionData } from "@remix-run/react";
import { SetupComponent } from "~/components/setup";
import { requireUser } from "~/services/auth.server";
import { CreateWorkplace } from "~/services/hasura.server";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const user = await requireUser(request);

  if (!user) return redirect("/login");

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const url = isValidUrl(values.url as string)
    ? new URL(values.url as string)
    : "";

  //FIX ALL OF THIS WITH ZODIX
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

  // -------------

  if (url && username && password) {
    try {
      const encode = `${username}:${password}`;

      const encoded = btoa(encode);

      const titleResponse = await fetch(
        `${url}wp-json/wp/v2/settings?context=view`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encoded}`,
          },
          method: "GET",
        }
      );
      const titleData = await titleResponse.json();
      console.log(titleData);
      if (titleData.code)
        if (titleData.code === "rest_forbidden")
          return json({
            error_username: "incorrect username or password",
          });
      const workplace = await CreateWorkplace(
        user?.id!,
        encoded,
        url.toString(),
        titleData.title
      );

      return redirect(`/dashboard/workplaces/${workplace.id}`, {});
    } catch (err) {
      console.log(err);
      return { error_message: "there was an error." };
    }
  } else {
    return json({ error_url, error_username, error_password });
  }
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  return user;
};

const AddWorkplace = () => {
  const data = useActionData();

  return (
    <div className="pb-10 xl:pb-0">
      <div className="grid h-full grid-cols-1 gap-10 xl:grid-cols-2 ">
        <SetupComponent />
        <div className="flex flex-col justify-center h-full px-5 lg:px-20 ">
          <h2 className="text-3xl font-semibold tracking-wide">
            Setup your workplace.
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            To create a workplace and change SEO on images you need to follow
            the steps on the left.
          </p>
          <p
            className={`${
              data?.error_message && data?.error_message.length > 0
                ? "block"
                : "hidden"
            } mt-1 text-red-500 `}
          >
            {data?.error_message}
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
                    data?.error_url && data?.error_url.length > 0
                      ? "block"
                      : "hidden"
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
                    data?.error_username && data?.error_username.length > 0
                      ? "block"
                      : "hidden"
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
                    data?.error_password && data?.error_password.length > 0
                      ? "block "
                      : " hidden"
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
    </div>
  );
};

export default AddWorkplace;
