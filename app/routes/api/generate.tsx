import { type ActionArgs, json } from "@remix-run/node";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  console.log(values);
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

  try {
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

    const labels = data?.responses[0]?.labelAnnotations?.map(
      (label: any) => label.description
    );
    return json(labels);
  } catch (error) {
    return {};
  }
}
