import { type LinksFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useFetchers,
  useNavigation,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";

import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect, useMemo } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: nProgressStyles },
];

export function meta() {
  return { title: "LIA Website" };
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  const transition = useNavigation();
  const fetchers = useFetchers();

  const state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      const states = [
        transition.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers]
  );

  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [transition.state]);

  return (
    <>
      <Document>
        <Outlet />
      </Document>
    </>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error">
      <div>
        <h1>There was an error</h1>
        <p>{error.message}</p>
        <hr />
        {/* <p>
          Hey, developer, you should replace this with what you want your users
          to see.
        </p> */}
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  let message;

  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" className="h-full font-main ">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {title ? <title>{title}</title> : null}

        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
