import {
  redirect,
  type ActionArgs,
  type ActionFunction,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { WPschema } from "~/types";
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  /* const urlExists = ; */
  const url = isValidUrl(values.url as string)
    ? new URL(values.url as string)
    : "";
  if (url) {
    try {
      const f = await fetch(`${url}/wp-json/wp/v2/media?media_type=image`);
      (await f.json()) as WPschema[];
      return redirect("/");
    } catch (err) {
      return { error_message: "url is not a wordpress url." };
    }
  }
  return { error_message: "not a valid url." };
};
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
export default function Home() {
  const actionData = useActionData();
  return (
    <div className="flex flex-col items-center justify-center font-mono">
      <h2 className="text-2xl font-semibold leading-10 ">
        Image To Text Using Wordpress Api!
      </h2>
      <h4>Steps</h4>
      <p>Step 1: Install WP Rest Api Plugin in wordpress plugins.</p>
      <p>Step 2: Press the download link and add the zip file to plugins</p>
      <p>Step 3: Enter your website url!</p>
      <Form className="flex flex-col mt-4" method="post">
        <input name="url" className="border rounded-sm" />
        <button type="submit">Try it!</button>
      </Form>
      <p>{actionData?.error_message}</p>
      {/* <a href="/jwt-secret-plugin.zip" download></a> */}
    </div>
  );
}
