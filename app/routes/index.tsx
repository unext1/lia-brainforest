import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import { useState } from "react";

interface WPschema {
  id: number;
  date: number;
  title: {
    rendered: string;
  };
  source_url: string;
}

export async function loader(params: LoaderArgs) {
  const data = (await fetch(
    "https://test.skibikehike.se/wp-json/wp/v2/media"
  ).then((response) => response.json())) as WPschema[];
  return json(data);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

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

  const data = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
  ).then((response) => response.json());

  const labels = data.responses[0].labelAnnotations.map(
    (label: any) => label.description
  );

  return json(labels);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const labels = useActionData();

  const [selectedImage, setSelectedImage] = useState<WPschema | null>(null);

  return (
    <>
      <div className="flex gap-5">
        {data.map((image) => (
          <div key={image.id}>
            <img
              src={image.source_url}
              alt={image.source_url}
              className="h-32 w-52"
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <>
          <h2>Alt generator for {selectedImage.title.rendered}</h2>
          <Form method="post">
            <input
              name="image"
              type="hidden"
              value={selectedImage.source_url}
            />
            <img
              src={
                selectedImage.source_url
                  ? selectedImage.source_url
                  : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              }
              alt={selectedImage.source_url}
              className="h-52"
            />
            <button type="submit">Submit</button>
          </Form>
        </>
      )}
      {labels
        ? labels.map((i: string) => (
            <div key={i}>
              <h1>{i}</h1>
            </div>
          ))
        : null}
    </>
  );
}
