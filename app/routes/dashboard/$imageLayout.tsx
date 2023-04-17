import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { Images } from "~/components/images";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";
export const routes = ["editedimages", "images", "uneditedimages"];
export async function loader({ request, params }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
  const { imageLayout } = params;

  if (!cookie) return redirect("/setup");
  //NOTE CHANGE THE ROUTE HERE
  const filter = {
    isRoute: routes.includes(imageLayout as string),
    route: routes.filter((route) => route === (imageLayout as string))[0],
  };
  if (!filter.isRoute) return redirect("/dashboard/image");

  try {
    //CHECK PARAMS AND FETCH DIFFERENTLY.
    const f = await fetch(
      `${cookie.url}wp-json/wp/v2/media?media_type=image&per_page=20&page=1`
    );
    const data = (await f.json()) as WPschema[];
    /* console.log(data.map((img) => img.meta)); */
    if (filter.route === routes[0]) {
      const editedData = data.filter(
        (image) => image.ai_generated_text === "1"
      );
      return json({ data: editedData });
    }
    if (filter.route === routes[2]) {
      const uneditedData = data.filter(
        (image) => image.ai_generated_text !== "1"
      );
      return json({ data: uneditedData });
    }
    if (filter.route === routes[1]) return json({ data });
  } catch (err: any) {
    if (err.code === "ERR_INVALID_URL")
      return {
        error_message: "Invalid Url, try entering your url in home page.",
      };
    console.error(err.message);
    return { error_message: "error" };
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
      <Images
        route={routes[1]}
        data={data}
        error_message={error_message}
        navigation={navigation}
      >
        <Outlet />
      </Images>
    </div>
  );
};
export default LayoutImage;
