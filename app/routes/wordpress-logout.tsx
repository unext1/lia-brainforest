import { redirect, type ActionArgs } from "@remix-run/node";

import { wordpressCookie } from "~/cookie";

export const action = async ({ request }: ActionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await wordpressCookie.parse(cookieHeader)) || {};

  return redirect("/setup", {
    headers: {
      "Set-Cookie": await wordpressCookie.serialize(cookie, {
        maxAge: -999999,
      }),
    },
  });
};
