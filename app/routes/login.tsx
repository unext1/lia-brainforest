import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("google", request, {
    successRedirect: "/dashboard/workplaces",
    failureRedirect: "/login",
  });
}
export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard/workplaces",
  });
  return {};
}
export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen ">
        <div className=" sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-12 bg-white shadow-lg rounded-xl py-14">
            <div>
              <h1 className="mb-2 font-semibold text-center">
                Sign in with Google
              </h1>
              <Form method="post">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-1.5 transition-all bg-white border border-red-400 rounded-xl hover:bg-red-500 "
                >
                  <img
                    className="w-6"
                    alt="google icon "
                    src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                  />
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
