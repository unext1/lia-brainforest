import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { ImageComponent } from "~/components/imageform";
import { GetWorkplaceById } from "~/services/hasura.server";
import { type WPschema } from "~/types";

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const obj = {
    title: values.title,
    description: values.description,
  };

  try {
    const workplace = await GetWorkplaceById(params.workplaceId!);
    const response = await fetch(
      `${workplace.url}wp-json/wp/v2/media/${values.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${workplace.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    const data = await response.json();
    if (data.code === "jwt_auth_invalid_token") {
      return json({ errormessage: data });
    } else return json(data);
  } catch (error) {
    console.log(error);
    console.log("THIS WAS ERRORRR");
    return json({ errormessage: error });
  }
}

export async function loader({ params, request }: LoaderArgs) {
  const { img, workplaceId } = params;
  const workplace = await GetWorkplaceById(workplaceId!);

  try {
    const imageResponse = await fetch(
      `${workplace.url}wp-json/wp/v2/media/${img}`
    );
    const data = (await imageResponse.json()) as WPschema;
    const aiResponse = await fetch(
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

    const aiText = await aiResponse.json();

    if (!aiText) return json({ tags: "", description: "" });
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

  const actionData = useActionData();

  const navigation = useNavigation();

  console.log(actionData, "ACTIONDATA");
  return (
    <div className="max-h-screen">
      <div className="p-20 mt-20 bg-gray-100 rounded-3xl">
        {error_message}
        <div className="w-full">
          <div className="flex justify-between gap-20">
            <div className="mb-10 text-lg max-w-[50%] font-semibold">
              {data?.title.rendered.replace(/,/g, " ")}
            </div>
          </div>
          <img
            src={data?.source_url}
            alt={data?.source_url}
            className="w-1/3 mx-auto rounded-3xl"
          />
        </div>

        <div className="my-auto">
          <Form method="post">
            <ImageComponent
              tags={tags}
              data={data}
              navigation={navigation}
              description={description}
            />
          </Form>
          {actionData && actionData.errormessage
            ? actionData.errormessage.code
            : null}
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
