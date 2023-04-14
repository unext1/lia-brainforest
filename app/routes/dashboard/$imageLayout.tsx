import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { Images } from "~/components/image";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";

export async function loader({ request, params }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
  const { imageLayout } = params;

  if (!cookie) return redirect("/setup");
  try {
    const f = await fetch(
      `${cookie.url}wp-json/wp/v2/media?media_type=image&per_page=20&page=1`
    );
    console.log(cookie.url);
    const data = (await f.json()) as WPschema[];
    return json({ data });
  } catch (err: any) {
    if (err.code === "ERR_INVALID_URL")
      return {
        error_message: "Invalid Url, try entering your url in home page.",
      };
    return null;
  }
}

const LayoutImage = () => {
  const { data, error_message } = useLoaderData<{
    data: WPschema[];
    error_message: string;
  }>();

  const navigation = useNavigation();

  return (
    <div>
      <Images data={data} error_message={error_message} navigation={navigation}>
        <Outlet />
      </Images>
    </div>
  );
};
export default LayoutImage;
