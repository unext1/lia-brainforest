import { Link } from "@remix-run/react";
import { forwardRef, type ReactNode } from "react";
import { type WPschema } from "~/types";

type Props = {
  data: WPschema[];
  navigation: any;
  error_message: string;
  children: ReactNode;
};
const Images = forwardRef<HTMLDivElement, Props>(function Images(
  { data, navigation, error_message, children },
  ref
) {
  return (
    <div className="container gap-10 pb-20 mx-auto max-w-7xl ">
      <div
        ref={ref}
        className="container flex gap-5 py-10 mx-auto overflow-x-scroll gap-x-20 snap-mandatory snap-x"
      >
        {data?.map((image) => (
          <div key={image.id} className="relative flex-shrink-0 snap-center">
            <div
              className={` absolute top-0 w-4 h-4  rounded-full -right-5 ${
                image.ai_generated_text ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <Link to={`/dashboard/images/${image.id}${navigation}`}>
              <img
                src={image.source_url}
                alt={image.source_url}
                className="object-scale-down h-32 w-36"
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex-1" key={navigation.location?.pathname}>
        {error_message ? <h2>Error {error_message}</h2> : ""}

        {children}
      </div>
    </div>
  );
});

export { Images };
