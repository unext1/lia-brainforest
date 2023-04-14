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
    description: values.description,
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
  if (!cookie) return redirect("/setup");
  const { img } = params;

  try {
    const f = await fetch(`${cookie.url}wp-json/wp/v2/media/${img}`);
    const data = (await f.json()) as WPschema;

    const fetchText = await fetch(
      "https://northeurope.api.cognitive.microsoft.com/vision/v3.2/describe?maxCandidates=1&language=en&model-version=latest",
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env
            .AZURE_SUBSCRIPTION_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: data.source_url,
        }),
      }
    );
    const aiText = await fetchText.json();

    if (!aiText.description) return json({ tags: "", description: "" });
    const aiTextDescription: string = aiText.description.captions
      ? aiText.description.captions.map((caption: any) => caption.text)
      : "";

    const htmlDescription = data.description.rendered;
    const description =
      htmlDescription.split("</p>").length > 1
        ? htmlDescription.split("</p>")[1].slice(4)
        : "";

    return json({
      tags: aiText.description.tags,
      description: aiTextDescription,
      data: { ...data, description: { rendered: description } },
    });
  } catch (err: any) {
    if (err.code === "ERR_INVALID_URL")
      return {
        error_message: "Invalid Url, try entering your url in home page.",
      };
    return { error_message: "Error" };
  }
}
const ImageForm = () => {
  const { data, error_message, tags, description } = useLoaderData<{
    tags: any;
    description: any;
    data: WPschema;
    error_message: string;
  }>();

  console.log(tags, description);
  // const labels = useActionData();
  const navigation = useNavigation();
  // const fetcher = useFetcher();

  return (
    <div className="max-h-screen">
      <div className="p-20 mt-20 bg-gray-100 rounded-3xl">
        <div className="w-full">
          <div className="flex justify-between gap-20">
            <div className="mb-10 text-lg max-w-[50%] font-semibold">
              {data?.title.rendered.replace(/,/g, " ")}
            </div>
            {/* <fetcher.Form method="post" action="/api/generateAzure">
              <input name="id" type="hidden" defaultValue={data?.id} />
              <input
                name="image"
                type="hidden"
                defaultValue={data?.source_url}
              />

              <button
                type="submit"
                name="_action"
                value="GENERATE"
                className=" w-fit sm:px-12 sm:py-2.5 mx-auto mt-2 text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
              >
                Generate Text
              </button>
            </fetcher.Form> */}
          </div>
          <img
            src={
              /*  data.mime_type != "application/pdf" */
              data?.source_url
              /* "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" */
            }
            alt={data?.source_url}
            className="w-1/3 mx-auto rounded-3xl"
          />
        </div>

        <div className="my-auto">
          <Form method="post">
            <div className="grid grid-cols-2 gap-10 mt-10 mb-6">
              <div className="flex flex-col">
                <label htmlFor="title">Wordpress title</label>
                <textarea
                  className="px-3 min-h-[100px] rounded-lg resize-none"
                  name="title"
                  placeholder="No title yet.."
                  defaultValue={data?.title.rendered}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="title">Generated title</label>
                <textarea
                  className="px-3 min-h-[100px] rounded-lg resize-none"
                  name="title"
                  placeholder="Not Generated"
                  defaultValue={tags ? tags : ""}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Wordpress description</label>
                <textarea
                  className="px-3 min-h-[100px] rounded-lg resize-none"
                  name="description"
                  placeholder="No description yet.. "
                  defaultValue={data?.description.rendered}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Generated description</label>

                <textarea
                  className="px-3 min-h-[100px] rounded-lg resize-none"
                  name="description"
                  placeholder="Not Generated"
                  defaultValue={
                    description ? description : "Failed to generate"
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="title">Wordpress alt tag</label>
                <textarea
                  className="px-3 min-h-[100px] rounded-lg resize-none"
                  name="alt-tag"
                  placeholder="No alt tag yet.. "
                  defaultValue={data?.description.rendered}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="alt-tag">Generated alt tag</label>

                <textarea
                  className="px-3 min-h-[100px] rounded-lg resize-none"
                  name="alt-tag"
                  placeholder="Not generated"
                  defaultValue={
                    description ? description : "Failed to generate"
                  }
                />
              </div>
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
            <input name="id" type="hidden" defaultValue={data?.id} />
            <input name="image" type="hidden" defaultValue={data?.source_url} />
            <button
              type="submit"
              value="GENERATE"
              className=" w-fit  sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
            >
              {navigation.state === "submitting" ? "Saving.." : "Save"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
