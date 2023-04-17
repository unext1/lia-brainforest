import { type LoaderArgs, redirect, json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { Images } from "~/components/images";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";
export const routes = ["editedimages", "images", "uneditedimages"];
export async function loader({ request, params }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page")) || 1;

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
      `${
        cookie.url
      }wp-json/wp/v2/media?media_type=image&per_page=20&page=${Number(page)}`
    );
    const data = (await f.json()) as WPschema[];
    /* console.log(data.map((img) => img.meta)); */
    if (filter.route === routes[0]) {
      const editedData = data.filter(
        (image) => image.ai_generated_text === "1"
      );
      return json({ data: editedData, currentPage: page });
    }
    if (filter.route === routes[2]) {
      const uneditedData = data.filter(
        (image) => image.ai_generated_text !== "1"
      );
      return json({ data: uneditedData, currentPage: page });
    }
    if (filter.route === routes[1]) return json({ data, currentPage: page });
  } catch (err: any) {
    if (err.code === "ERR_INVALID_URL")
      return {
        error_message: "Invalid Url, try entering your url in home page.",
      };
    return { error_message: "error" };
  }
}

const LayoutImage = () => {
  const { data, error_message, currentPage } = useLoaderData<{
    data: WPschema[];
    error_message: string;
    currentPage: number;
  }>();

  console.log(currentPage + "CurrentPage");

  const navigation = useNavigation();
  const params = useParams();
  const location = useLocation();

  return (
    <div>
      <Images
        route={params.imageLayout as string}
        data={data}
        error_message={error_message}
        navigation={navigation}
      >
        <div>
          <Link
            to={`${location.pathname}?page=${currentPage - 1}`}
            className={Number(currentPage) <= 1 ? "hidden" : "block"}
          >
            Previous
          </Link>
          <Link to={`${location.pathname}?page=${currentPage + 1}`}>Next</Link>
        </div>

        <Outlet />
      </Images>
    </div>
  );
};
export default LayoutImage;
