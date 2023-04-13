import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
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
      <div className="container gap-10 pb-20 mx-auto max-w-7xl ">
        <div className="container flex gap-5 py-10 mx-auto overflow-x-scroll gap-x-20 snap-mandatory snap-x">
          {data.map((image) => (
            <div key={image.id} className="flex-shrink-0 snap-center">
              <Link to={`/dashboard/image/${image.id}`}>
                <img
                  src={image.source_url}
                  alt={image.source_url}
                  className="object-scale-down h-32 w-36"
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-1" key={navigation.location?.pathname}>
          {error_message ? <h2>Error {error_message}</h2> : ""}

          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default LayoutImage;
