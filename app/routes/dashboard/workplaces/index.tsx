import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import Btn from "~/components/button";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  //hasura.request(CREATEWORKPLACE) => user
  //display created screen
  return null;
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  // hasura.request(GETWORKPLACE) => user
  // display workplaces
  return null;
};
export default function Index() {
  return (
    <>
      <div className="max-w-[50%] flex flex-col items-center">
        <h1>Welcome to workplaces!</h1>
        <h3>You do not seem to have any active workplaces.</h3>
        <Btn href="/setup" link title="Create a new workplace here!" />
      </div>
    </>
  );
}
