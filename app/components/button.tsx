import { Link } from "@remix-run/react";

const Btn = ({
  title,
  link,
  href,
}: {
  title: string;
  link: boolean;
  href?: string;
}) => {
  return (
    <>
      {link ? (
        <Link
          to={href!}
          className="w-fit duration-150 transform hover:scale-105 flex sm:px-12 sm:py-2.5 mx-auto mt-8 text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg"
        >
          {title}
        </Link>
      ) : (
        <button className="w-fit duration-150 transform hover:scale-105 flex sm:px-12 sm:py-2.5 mx-auto mt-8  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg">
          {title}
        </button>
      )}
    </>
  );
};

export default Btn;
