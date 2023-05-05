import { Dialog, Transition } from "@headlessui/react";
import { Form, Link } from "@remix-run/react";
import React, { Fragment } from "react";
import type { Navigation, TUser } from "~/types";
import { NavList } from "./NavList";
import { Profile } from "./profile";
export const MobileSidebar = ({
  setState,
  state,
  navigation,
  user,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  navigation: Navigation;
  user: TUser | undefined;
}) => {
  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setState}>
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
                    onClick={() => setState(false)}
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
                  <Link to="/dashboard">
                    <h1 className="text-lg font-semibold tracking-wide">
                      AI APP
                    </h1>
                  </Link>
                </div>
                <nav className="flex flex-col flex-1">
                  <div className="flex flex-col flex-1 gap-y-7">
                    <div className="-mx-2 space-y-1">
                      <NavList navigation={navigation} />
                    </div>

                    <div className="mt-auto ">
                      <Profile user={user} />
                    </div>
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
