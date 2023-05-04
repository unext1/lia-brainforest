import { Link } from "@remix-run/react";
import { forwardRef } from "react";
import { type WPschema } from "~/types";

type Props = {
  data: WPschema[];
  navigation: any;
  error_message: string;
  workplaceId: string;
};
const Images = forwardRef<HTMLDivElement, Props>(function Images(
  { data, navigation, workplaceId },
  ref
) {
  return (
    <div className="w-full p-5 mt-5 bg-white xl:mt-10 rounded-xl">
      <div
        ref={ref}
        className=" flex xl:block xl:h-[700px] xl:py-10  overflow-x-auto snap-x space-x-10 xl:space-x-0 xl:overflow-y-auto  snap-mandatory xl:snap-y xl:space-y-10"
      >
        {data?.map((image) => (
          <div key={image.id} className="relative flex-shrink-0 snap-center">
            <div
              className={` absolute top-0 w-4 h-4  rounded-full right-0 ${
                image.ai_generated_text ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <Link
              to={`/dashboard/workplaces/${workplaceId}/images/${image.id}${navigation}`}
            >
              <img
                src={image.source_url}
                alt={image.source_url}
                className="object-fill w-24 h-24 "
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Images;
