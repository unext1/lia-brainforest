import { Link } from "@remix-run/react";
import { type ReactNode } from "react";
import { type WPschema } from "~/types";

export const Images = ({
  data,
  navigation,
  error_message,
  children,
}: {
  data: WPschema[];
  navigation: any;
  error_message: string;
  children: ReactNode;
}) => {
  return (
    <div className="container gap-10 pb-20 mx-auto max-w-7xl ">
      <div className="container flex gap-5 py-10 mx-auto overflow-x-scroll gap-x-20 snap-mandatory snap-x">
        {data.map((image) => (
          <div key={image.id} className="flex-shrink-0 snap-center">
            <Link to={`/dashboard/image/${image.id}`}>
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
};