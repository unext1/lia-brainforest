import { NavLink } from "@remix-run/react";

export const DashboardItem = ({
  item,
}: {
  item: {
    name: string;
    href: string;
    svg: JSX.Element;
  };
}) => {
  return (
    <div>
      <NavLink
        end
        to={item.href}
        className={({ isActive }) =>
          isActive
            ? "bg-gray-100 text-red-500 group outline-none focus:outline-none flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
            : "text-gray-700 hover:text-red-500  outline-none focus:outline-none hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
        }
      >
        {item.svg}
        <div className="my-auto">{item.name}</div>
      </NavLink>
    </div>
  );
};
