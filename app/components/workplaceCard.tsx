import { Link } from "@remix-run/react";

const WorkplaceCard = ({ workplace }: { workplace: any }) => {
  return (
    <div className="w-full h-full p-5 bg-gray-50 rounded-xl" key={workplace.id}>
      <Link to={`/dashboard/workplaces/${workplace.id}`}>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 fill-red-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>
          {/* <Form method="post" className="w-full">
    <input name="id" value={workplace.id} type="hidden" />
    <button
      type="submit"
      className="w-full text-right text-red-400"
    >
      X
    </button>
  </Form> */}
        </div>
      </Link>

      <div className="mt-4">
        <h2 className="mt-1 text-sm font-semibold uppercase">
          {workplace.title}
        </h2>

        <div className="flex justify-between w-full mt-5 text-xs">
          <div className="">
            <p className="">Created At</p>
            <p>{new Date(workplace.createdAt).toLocaleDateString("en-GB")} </p>
          </div>
          <div className="text-right">
            <p>Updated At</p>
            <p>{new Date(workplace.updatedAt).toLocaleDateString("en-GB")} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkplaceCard;
