import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { wordpressCookie } from "~/cookie";
import { type LoaderArgs, redirect, json } from "@remix-run/node";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "All Images", href: "/dashboard/images" },
];

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await wordpressCookie.parse(cookieHeader);

  if (!cookie) return redirect("/setup");
  return json(cookie);
}
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cookie = useLoaderData();
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <div className="w-6 h-6 text-white" aria-hidden="true">
                          X
                        </div>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5">
                    <div className="flex flex-col justify-center h-16 shrink-0">
                      <h1 className="text-lg font-semibold tracking-wide">
                        AI APP
                      </h1>
                      <h4 className="text-sm text-gray-600">{cookie.title}</h4>
                    </div>
                    <nav className="flex flex-col flex-1">
                      <div className="flex flex-col flex-1 gap-y-7">
                        <div className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <div key={item.name}>
                              <NavLink
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                end
                                to={item.href}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-gray-100 text-red-500 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
                                    : "text-gray-700 hover:text-red-500 hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4 my-auto"
                                >
                                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                </svg>

                                <div className="my-auto">{item.name}</div>
                              </NavLink>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto ">
                          <Link
                            to="/dashboard/settings"
                            className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md outline-none focus:outline-none group gap-x-3 hover:bg-gray-100 hover:text-red-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 my-auto"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <div className="my-auto">Settings</div>
                          </Link>
                        </div>
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
            <div className="flex flex-col justify-center h-16 shrink-0">
              <h1 className="text-lg font-semibold tracking-wide">AI APP</h1>
              <h4 className="text-sm text-gray-600">{cookie.title}</h4>
            </div>
            <nav className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 gap-y-7">
                <div className="-mx-2 space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <NavLink
                        end
                        to={item.href}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-gray-100 text-red-500 group outline-none focus:outline-none flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
                            : "text-gray-700 hover:text-red-500  outline-none focus:outline-none hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 my-auto"
                        >
                          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        <div className="my-auto">{item.name}</div>
                      </NavLink>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    to="/dashboard/settings"
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
                </div>
              </div>
            </nav>
          </div>
        </div>
        <button
          type="button"
          className="absolute px-3 py-1 text-white bg-red-500 rounded-xl lg:hidden right-5 top-3"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>X
        </button>

        <div className="lg:pl-72">
          <main className="">
            <div className="px-4 pt-5 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
