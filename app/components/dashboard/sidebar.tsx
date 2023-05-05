import { Form, Link } from "@remix-run/react";
import { NavList } from "./NavList";
import { Profile } from "./profile";
import type { TUser } from "~/types";
import { ProfileCard } from "../profilecard";

export const Sidebar = ({
  navigation,
  setState,
  state,
  user,
}: {
  navigation: { name: string; href: string; svg: JSX.Element }[];
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  user: TUser | undefined;
}) => {
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col overflow-x-hidden overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
          <div className="flex flex-col justify-center h-16 px-6 shrink-0">
            <Link to="/dashboard">
              <h1 className="text-lg font-semibold tracking-wide ">AI APP</h1>
            </Link>
          </div>
          <nav className="flex flex-col flex-1">
            <div className="flex flex-col flex-1 gap-y-7">
              <div className="px-6 -mx-2 space-y-2">
                <NavList navigation={navigation} />
              </div>

              <div className="mt-auto">
                <Profile user={user} />

                {/* <Form
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
                </Form> */}
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
        <span className="sr-only">Open sidebar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </>
  );
};
