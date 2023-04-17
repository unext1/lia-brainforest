import { redirect, type ActionArgs, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
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
