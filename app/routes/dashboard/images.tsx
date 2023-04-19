import { type LoaderArgs, json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigation,
} from "@remix-run/react";
import { Images } from "~/components/images";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";

const TOTAL_IMAGES_PER_PAGE = 20;

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
  const searchParam = new URL(request.url).searchParams;

  const pageParam = searchParam.get("page");
  const imgType = searchParam.get("image_type");

  const page = pageParam ? Number(pageParam) : 1;

  try {
    const f = await fetch(
      `${
        cookie.url
      }wp-json/wp/v2/media?media_type=image&per_page=${TOTAL_IMAGES_PER_PAGE}&page=${Number(
        page
      )}&ai_generated_text=${
        imgType
          ? imgType === "all"
            ? "0"
            : imgType === "edited"
            ? "1"
            : "2"
          : "0"
      }`
    );

    const totalPages = f.headers.get("x-wp-totalpages");

    const data = (await f.json()) as WPschema[];

    return json({ data: data, currentPage: page, totalPages, imgType });
  } catch (err: any) {
    if (err.code === "ERR_INVALID_URL")
      return {
        error_message: "Invalid Url, try entering your url in home page.",
      };
    return { error_message: "error" };
  }
}

const LayoutImage = () => {
  const { data, error_message, currentPage, totalPages, imgType } =
    useLoaderData<{
      data: WPschema[];
      error_message: string;
      currentPage: number;
      totalPages: number;
      imgType: string;
    }>();

  const navigation = useNavigation();
  const location = useLocation();

  return (
    <div>
      <Form action="/dashboard/images">
        <input
          type="hidden"
          name="page"
          value={currentPage ? currentPage : 1}
        />
        <label htmlFor="image_type">Image Type</label>
        <select name="image_type">
          <option value="all">All Images</option>
          <option value="edited">Edited Images</option>
          <option value="unedited">Unedited Images</option>
        </select>
        <button type="submit">Submit</button>
      </Form>
      <Images data={data} error_message={error_message} navigation={navigation}>
        <div className="flex flex-row justify-between">
          <Link
            to={`${location.pathname}?page=${currentPage - 1}${
              imgType ? `&image_type=${imgType}` : ""
            }`}
            className={Number(currentPage) <= 1 ? "invisible" : "block"}
          >
            Previous
          </Link>
          <div>
            {currentPage} {totalPages > 0 ? "/" : ""}{" "}
            {totalPages > 0 ? totalPages : ""}
          </div>
          <Link
            to={`${location.pathname}?page=${currentPage + 1}${
              imgType ? `&image_type=${imgType}` : ""
            }`}
            className={
              Number(currentPage) >= totalPages ? "invisible" : "block"
            }
          >
            Next
          </Link>
        </div>

        <Outlet />
      </Images>
    </div>
  );
};
export default LayoutImage;
