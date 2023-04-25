import { Form } from "@remix-run/react";
import { Navigation, WPschema } from "~/types";

export const ImageComponent = ({
  navigation,
  tags,
  data,
  description,
}: {
  navigation: any;
  tags: any;
  data: WPschema;
  description: any;
}) => {
  return (
    <>
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
            defaultValue={description ? description : "Failed to generate"}
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
            defaultValue={description ? description : "Failed to generate"}
          />
        </div>
      </div>

      <input name="id" type="hidden" defaultValue={data?.id} />
      <input name="image" type="hidden" defaultValue={data?.source_url} />
      <button
        type="submit"
        value="GENERATE"
        className=" w-fit  sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
      >
        {navigation.state === "submitting" ? "Saving.." : "Save"}
      </button>
    </>
  );
};