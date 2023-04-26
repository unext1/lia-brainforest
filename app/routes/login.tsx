import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("google", request, {
    successRedirect: "/setup",
    failureRedirect: "/login",
  });
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
