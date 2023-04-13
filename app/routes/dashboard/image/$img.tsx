import {
  type LoaderArgs,
  redirect,
  json,
  type ActionArgs,
} from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { wordpressCookie } from "~/cookie";
import { type WPschema } from "~/types";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await wordpressCookie.parse(cookieHeader)) || {};
  const obj = {
    title: values.title,
  };
  const f = await fetch(`${cookie.url}wp-json/wp/v2/media/${values.id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await f.json();
  console.log("CHANGED", data);
  return {};
}

export async function loader({ params, request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);

  const { img } = params;

  if (!cookie) return redirect("/setup");
  try {
    const f = await fetch(`${cookie.url}wp-json/wp/v2/media/${img}`);
    const data = (await f.json()) as WPschema;
    // console.log(data);
    return json({ data });
  } catch (err: any) {
    if (err.code === "ERR_INVALID_URL")
      return {
        error_message: "Invalid Url, try entering your url in home page.",
      };
    return null;
  }
}
const ImageForm = () => {
  const { data, error_message } = useLoaderData<{
    data: WPschema;
    error_message: string;
  }>();

  // const labels = useActionData();
  const navigation = useNavigation();
  const fetcher = useFetcher();
  console.log(error_message);

  return (
    <div className="max-h-screen">
      <div className="p-20 mt-20 bg-gray-100 rounded-3xl">
        <div className="w-full">
          <div className="flex justify-between gap-20">
            <div className="mb-10 text-lg max-w-[50%] font-semibold">
              {data.title.rendered.replace(/,/g, " ")}
            </div>
            <fetcher.Form method="post" action="/api/generate">
              <input name="id" type="hidden" defaultValue={data.id} />
              <input
                name="image"
                type="hidden"
                defaultValue={data.source_url}
              />

              <button
                type="submit"
                name="_action"
                value="GENERATE"
                className=" w-fit sm:px-12 sm:py-2.5 mx-auto mt-2 text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
              >
                Generate Text
              </button>
            </fetcher.Form>
          </div>
          <img
            src={
              data.mime_type != "application/pdf"
                ? data.source_url
                : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
            }
            alt={data.source_url}
            className="w-1/3 mx-auto rounded-3xl"
          />
        </div>

        <div className="my-auto">
          <Form method="post">
            <div className="grid grid-cols-2 gap-10 mt-10 mb-6">
              <textarea
                className="px-3 min-h-[100px] rounded-lg resize-none"
                name="title"
                placeholder="Not Generated"
                defaultValue={data.title.rendered}
                readOnly
              />
              <textarea
                className="px-3 min-h-[100px] rounded-lg resize-none"
                name="title"
                placeholder="Not Generated"
                defaultValue={fetcher.data}
              />
            </div>

            {/* <div className="relative flex items-start ">
              <div className="flex-1 min-w-0 text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-900">
                  Change in Wordpress
                </label>
                <p id="checkbox" className="text-sm text-gray-500">
                  This Ai Generated text will be changed on your wordpress image
                  alt input.
                </p>
              </div>
              <div className="flex items-center h-6 my-auto ml-3">
                <input
                  id="comments"
                  aria-describedby="checkbox"
                  name="comments"
                  type="checkbox"
                  className="w-4 h-4 my-auto text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                />
              </div>
            </div> */}
            <input name="id" type="hidden" defaultValue={data.id} />
            <input name="image" type="hidden" defaultValue={data.source_url} />
            <button
              type="submit"
              value="GENERATE"
              className=" w-fit  sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
            >
              {navigation.state === "submitting" ? "Saving text..." : "Save"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
