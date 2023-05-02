import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator, redirectUser } from "~/services/auth.server";
export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("google", request, {
    successRedirect: "/dashboard/workplaces",
    failureRedirect: "/login",
  });
}
export async function loader({ request }: LoaderArgs) {
  return await redirectUser(request, "/dashboard/workplaces");
}
export default function Login() {
  return (
    <>
      <Form method="post">
        <button type="submit">Login with google</button>
      </Form>
    </>
  );
}
