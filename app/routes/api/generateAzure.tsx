import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);

    const f = await fetch(
      "https://northeurope.api.cognitive.microsoft.com/vision/v3.2/describe?maxCandidates=1&language=en&model-version=latest",
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env
            .AZURE_SUBSCRIPTION_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: values.image,
        }),
      }
    );
    const data = await f.json();

    if (!data.description) return json({ tags: "", description: "" });
    console.log(data.description);
    const description: string = data.description.captions
      ? data.description.captions.map((caption) => caption.text)
      : "";
    return json({
      tags: data.description.tags,
      description: description,
    });
  } catch (err) {
    console.error(err);
    return { error_message: err };
  }
};
