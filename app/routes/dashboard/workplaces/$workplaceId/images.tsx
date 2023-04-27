import { type LoaderArgs, json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { zx } from "zodix";
import { Images } from "~/components/images";
import { GetWorkplaceById } from "~/services/hasura.server";

import { type WPschema } from "~/types";

const TOTAL_IMAGES_PER_PAGE = 20;

export async function loader({ request, params }: LoaderArgs) {
  const { workplaceId } = params;
  const workplace = await GetWorkplaceById(workplaceId!);
  const res = zx.parseQuerySafe(request, {
    page: z.string().optional(),
    search: z.string().optional(),
    ai_generated_text: z.string().optional(),
    after: z
      .string()
      .optional()
      .transform((value) => value && new Date(value).toISOString()),
    before: z
      .string()
      .optional()
      .transform((value) => value && new Date(value).toISOString()),
  });

  let urlParams;
  if (res.success) {
    urlParams = new URLSearchParams(
      Object.entries(res.data).filter(([_, v]) => v)
    ).toString();
  }
  const searchParams = new URL(request.url).searchParams;
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  try {
    const imageResponse = await fetch(
      `${workplace.url}wp-json/wp/v2/media?media_type=image&per_page=${TOTAL_IMAGES_PER_PAGE}&${urlParams}`
    );
    const totalPages = imageResponse.headers.get("x-wp-totalpages");
    const data = (await imageResponse.json()) as WPschema[];
    return json({
      data: data,
      currentPage: page,
      totalPages,
      workplaceId,
    });
  } catch (err: any) {
    if (err.code === "ERR_INVALID_URL")
      return {
        error_message: "Invalid Url, try entering your url in home page.",
      };
    return { error_message: "error" };
  }
}

const LayoutImage = () => {
  const { data, error_message, currentPage, totalPages, workplaceId } =
    useLoaderData<{
      data: WPschema[];
      error_message: string;
      currentPage: number;
      totalPages: number;
      workplaceId: string;
    }>();

  const { search, pathname } = useLocation();
  console.log(search);
  const params = Object.fromEntries(new URLSearchParams(search).entries());
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollableRef?.current?.scrollTo(0, 0);
  }, [currentPage]);
  return (
    <div>
      <Form action="/dashboard/images">
        <input type="hidden" name="page" value="1" />
        <input type="text" name="search" />
        <label htmlFor="ai_generated_text">Image Type</label>
        <select name="ai_generated_text">
          <option value="0">All Images</option>
          <option value="1">Edited Images</option>
          <option value="2">Unedited Images</option>
        </select>
        <input type="date" name="after" />
        <input type="date" name="before" />
        <button type="submit">Submit</button>
      </Form>
      <Images
        ref={scrollableRef}
        data={data}
        error_message={error_message}
        navigation={search}
        workplaceId={workplaceId!}
      >
        <div className="flex flex-row justify-between">
          <Link
            to={`${pathname}?${new URLSearchParams({
              ...params,
              page: params?.page
                ? Math.max(Number(params.page) - 1, 1).toString()
                : "1",
            })}`}
            className={Number(currentPage) <= 1 ? "invisible" : "block"}
          >
            Previous
          </Link>
          <div>
            {currentPage} {totalPages > 0 ? "/" : ""}
            {totalPages > 0 ? totalPages : ""}
          </div>
          <Link
            to={`${pathname}?${new URLSearchParams({
              ...params,
              page: params?.page
                ? Math.min(Number(params.page) + 1).toString()
                : "1",
            })}`}
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
