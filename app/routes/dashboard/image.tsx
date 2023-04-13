import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";

export async function loader({ params, request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
  const { id } = params;
  if (!cookie) return redirect("/setup");
  try {
    const f = await fetch(
      `${cookie.url}wp-json/wp/v2/media?media_type=image&per_page=10&page=1`
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
      {error_message ? <h2>Error {error_message}</h2> : ""}
      <div className="container flex gap-10 pb-20 mx-auto max-w-7xl">
        <div className="container grid max-w-[400px] h-screen grid-cols-2 col-span-1 gap-5 py-20 mx-auto overflow-y-scroll gap-y-20">
          {data.map((image) => (
            <div key={image.id} className="">
              <Link to={`/dashboard/image/${image.id}`}>
                <img
                  src={image.source_url}
                  alt={image.source_url}
                  className="object-scale-down w-32 h-36"
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-1" key={navigation.location?.pathname}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default LayoutImage;
