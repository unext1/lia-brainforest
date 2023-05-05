import { Menu, Transition } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { Fragment, useState } from "react";
import type { TUser } from "~/types";

export const Profile = ({ user }: { user: TUser | undefined }) => {
  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center h-20 pl-4">
          <span className="sr-only">Open user menu</span>
          <img
            className="w-10 h-10 rounded-full bg-gray-50"
            src={user?.image}
            alt=""
          />
          <span className="flex items-center">
            <span
              className="ml-4 text-sm font-semibold leading-6 text-gray-900 capitalize lg:text-base"
              aria-hidden="true"
            >
              {user?.name}
            </span>
            {/* <ChevronDownIcon
              className="w-5 h-5 ml-2 text-gray-400"
              aria-hidden="true"
            /> */}
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-2 bottom-16 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Form method="post" action="/logout">
                  <button
                    className={`
                    ${active ? "bg-gray-50" : ""}
                    block px-3 py-1  leading-6 text-gray-900 hover:cursor-pointer min-w-full`}
                  >
                    Log out
                  </button>
                </Form>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* <button
        onClick={() => setShow((prev) => !prev)}
        className="flex items-center justify-center w-full gap-4 py-4 rounded-r-lg hover:bg-gray-200"
      >
        <img
          alt="profile"
          src={user?.image}
          className="w-12 h-12 rounded-full"
        />
        <h4 className="font-semibold capitalize">{user?.name}</h4>
      </button> */}
    </>
  );
};
