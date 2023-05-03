import { Form, Link, useSubmit } from "@remix-run/react";
import { NavList } from "./NavList";
import type { TWorkplace } from "~/types";
import { useRef } from "react";

export const Sidebar = ({
  navigation,
  setState,
  state,
  workplaces,
}: {
  navigation: { name: string; href: string; svg: JSX.Element }[];
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  workplaces: TWorkplace[];
}) => {
  const submitHandler = useSubmit();
  const ref = useRef<any>(null);
  const handleSubmit = () => {
    submitHandler(ref?.current, { replace: true });
  };

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
          <div className="flex flex-col justify-center h-16 shrink-0">
            <Link to="/dashboard">
              <h1 className="text-lg font-semibold tracking-wide ">AI APP</h1>
            </Link>
            {/* <Form method="post" ref={ref}>
              <select
                className="text-sm text-gray-600 border-0 selection:border-0 max-w-max"
                name="workplace"
                defaultValue="Select your workplace"
              >
                {workplaces?.map((workplace) => (
                  <option
                    onClick={handleSubmit}
                    key={workplace.id}
                    value={workplace.id!}
                  >
                    {workplace.title}
                  </option>
                ))}
                <option value="create-new" onClick={handleSubmit}>
                  Add a new workspace
                </option>
              </select>
            </Form> */}
          </div>
          <nav className="flex flex-col flex-1">
            <div className="flex flex-col flex-1 gap-y-7">
              <div className="-mx-2 space-y-2">
                <NavList navigation={navigation} />
              </div>

              <div className="mt-auto">
                <Link
                  onClick={() => setState(!state)}
                  to="/dashboard/settings/profile"
                  className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md group gap-x-3 hover:bg-gray-100 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 my-auto"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="my-auto">Settings</div>
                </Link>
                <Form
                  action="/logout"
                  method="post"
                  className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md outline-none focus:outline-none group gap-x-3 hover:bg-gray-100 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] my-auto"
                  >
                    <path d="M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.247.75.75 0 00.363.63 13.067 13.067 0 006.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002A7.125 7.125 0 0010.375 12zM16 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" />
                  </svg>

                  <button type="submit" className="my-auto">
                    Logout
                  </button>
                </Form>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <button
        type="button"
        className="absolute px-3 py-1 text-white bg-red-500 rounded-xl lg:hidden right-5 top-3"
        onClick={() => setState(true)}
      >
        <span className="sr-only">Open sidebar</span>X
      </button>
    </>
  );
};
