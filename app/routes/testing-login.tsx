import { LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData, useRevalidator } from "@remix-run/react";
import {
  createBrowserClient,
  createServerClient,
} from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";

import type { ActionArgs } from "@remix-run/node";
import { authCookie, wordpressCookie } from "~/cookie";

export async function action({ request }: ActionArgs) {
  const response = new Response();
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );
  if (_action === "login") {
    const signIn = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/testing-login",
      },
    });

    if (signIn) {
      return redirect(signIn?.data?.url);
    } else {
      return {};
    }
  }
  if (_action === "signout") {
    console.log("ranthis");
    await supabase.auth.signOut();
    return {};
  }
  return {};
}
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await authCookie.parse(cookieHeader)) || {};

  console.log(cookie);

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  return { env };
};
const TestingLog = () => {
  const { env } = useLoaderData();

  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // const revalidator = useRevalidator();

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(() => {
  //     revalidator.revalidate();
  //   });
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [supabase, revalidator]);

  return (
    <div>
      <Form method="post">
        <button type="submit" name="_action" value="login">
          Login
        </button>
        <button type="submit" name="_action" value="signout">
          Logout
        </button>
      </Form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TestingLog;

// import { redirect } from "@remix-run/node";
// import { Form, useLoaderData } from "@remix-run/react";
// import { createBrowserClient } from "@supabase/auth-helpers-remix";
// import { useState } from "react";

// import type { LoaderArgs } from "@remix-run/node";
// import type { ActionArgs } from "@remix-run/node";

// export async function action({ request }: ActionArgs) {
//   const formData = await request.formData();
//   const { _action } = Object.fromEntries(formData);
//   const supabase = createBrowserClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_ANON_KEY!
//   );
//   if (_action === "login") {
//     const signIn = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "http://localhost:3000/testing-login/",
//       },
//     });

//     if (signIn) {
//       return redirect(signIn?.data?.url);
//     } else return {};
//   }
//   if (_action === "signout") {
//     console.log("signout");
//     return supabase.auth.signOut();
//   }

//   return {};
// }
// export const loader = () => {
//   const env = {
//     SUPABASE_URL: process.env.SUPABASE_URL!,
//     SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
//   };
//   return { env };
// };

// const TestingLog = () => {
//   return (
//     <div>
//       <Form method="post">
//         <button type="submit" name="_action" value="login">
//           Login
//         </button>
//         <button type="submit" name="_action" value="signout">
//           Logout
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default TestingLog;
