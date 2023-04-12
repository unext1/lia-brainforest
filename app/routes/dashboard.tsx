import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import {
  type LoaderArgs,
  json,
  type ActionArgs,
  redirect,
} from "@remix-run/node";
import { useState } from "react";
import { type WPschema } from "~/types";
import { wordpressCookie } from "~/cookie";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const action = formData.get("_action");
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await wordpressCookie.parse(cookieHeader)) || {};
  let labels;
  if (action == "CHANGE") {
    const obj = {
      title: values.title,
    };
    const user = {
      username: cookie.username,
      password: cookie.password,
    };

    const tokenFetch = await fetch(`${cookie.url}wp-json/jwt-auth/v1/token`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(user),
    });
    const tokenData = await tokenFetch.json();
    const token = tokenData.token;
    const f = await fetch(`${cookie.url}wp-json/wp/v2/media/${values.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await f.json();
    console.log("CHANGED", data);
    return json(data.title.rendered);
  }

  if (action == "GENERATE") {
    const requestData = {
      requests: [
        {
          image: {
            source: {
              imageUri: values.image,
            },
          },
          features: [
            {
              type: "LABEL_DETECTION",
            },
          ],
        },
      ],
    };

    const f = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
    const data = await f.json();
    console.log("GENERATED");

    labels = data?.responses[0]?.labelAnnotations?.map(
      (label: any) => label.description
    );
    console.log(labels);
  }

  return json(labels);
}

export async function loader({ params, request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);
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

const Dashboard = () => {
  const { data, error_message } = useLoaderData<{
    data: WPschema[];
    error_message: string;
  }>();

  const labels = useActionData();

  const [selectedImageId, setSelectedImageId] = useState<number>();
  const selectedImage = selectedImageId
    ? data.find((image) => image.id == selectedImageId)
    : null;

  const transition = useTransition();
  const busy = transition.state === "submitting";

  return (
    <div className="container pb-20 mx-auto max-w-7xl">
      {error_message ? <h2>Error {error_message}</h2> : ""}
      <div className="container grid gap-5 py-20 mx-auto md:grid-cols-4 lg:grid-cols-6 gap-y-20">
        {data.map((image) => (
          <div key={image.id} className="">
            <img
              src={image.source_url}
              alt={image.source_url}
              className="object-cover w-full h-40"
              onClick={() => setSelectedImageId(image.id)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="grid grid-cols-2 gap-20 p-20 mt-20 bg-gray-100 md: rounded-3xl">
          <div>
            <h2 className="mb-10 text-xl font-semibold ">
              Alt Generator For {selectedImage.title.rendered}
            </h2>
            <img
              src={
                selectedImage.mime_type != "application/pdf"
                  ? selectedImage.source_url
                  : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              }
              alt={selectedImage.source_url}
              className="h-80 rounded-3xl"
            />
            <p className="mt-10 text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
              magni suscipit quia, provident nemo, officia accusantium cum sit
              soluta voluptate dolorum quis vitae illo facilis itaque unde fugit
              esse impedit!
            </p>
          </div>

          <Form method="post" className="my-auto">
            <input
              name="image"
              type="hidden"
              value={selectedImage.source_url}
            />

            <div className="flex gap-10 mb-6">
              <textarea
                className="px-4 py-1 rounded-lg resize-none"
                name="title"
                readOnly
                value={selectedImage.title.rendered}
              />
              <textarea
                className="px-4 py-1 rounded-lg resize-none"
                name="title"
                value={labels ? labels.toString() : "Text not generated"}
              />
            </div>

            {labels ? (
              <div className="relative flex items-start ">
                <div className="flex-1 min-w-0 text-sm leading-6">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-900"
                  >
                    Change in Wordpress
                  </label>
                  <p id="checkbox" className="text-sm text-gray-500">
                    This Ai Generated text will be changed on your wordpress
                    image alt input.
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
              </div>
            ) : null}

            <input hidden name="id" value={labels ? selectedImage.id : ""} />

            {labels ? (
              <button
                type="submit"
                name="_action"
                value="CHANGE"
                className=" w-fit  sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
              >
                {!busy ? "Change in Wordpress" : "Pushing..."}
              </button>
            ) : (
              <button
                type="submit"
                name="_action"
                value="GENERATE"
                className=" w-fit  sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
              >
                {!busy ? "Generate Text" : "Generating..."}
              </button>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
