import { Combobox, Transition } from "@headlessui/react";
import { json, redirect, type LoaderArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import {
  GetPublicUsers,
  INVITEUSERTOWORKPLACE,
  IsOwnerOfWorkplace,
  hasuraClient,
} from "~/services/hasura.server";

import type { ActionArgs } from "@remix-run/node";
import { z } from "zod";
import { zx } from "zodix";
import { requireUser } from "~/services/auth.server";
import { type TUser } from "~/types";
import toast, { Toaster } from "react-hot-toast";

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);

  const { userId, workplaceId } = await zx.parseForm(request, {
    userId: z.string(),
    workplaceId: z.string(),
  });

  if (userId && user) {
    await hasuraClient(user?.token).request(INVITEUSERTOWORKPLACE, {
      userId: userId,
      workplaceId: workplaceId,
    });
    return { toastMessage: "User has been added !" };
  } else return json({ error_message: "No user selected" });
}

export async function loader({ params, request }: LoaderArgs) {
  const { workplaceId } = params;
  const user = await requireUser(request);

  const isOwner = await IsOwnerOfWorkplace({
    token: user?.token!,
    workplaceId: workplaceId!,
    userId: user?.id!,
  });

  if (!isOwner) return redirect(`/dashboard/workplaces/${workplaceId}`);

  const users = await GetPublicUsers();

  return json({ users, workplaceId });
}

const AddUser = () => {
  const { users, workplaceId } = useLoaderData<{
    users: TUser[];
    workplaceId: string;
  }>();

  const actionData = useActionData();

  console.log(actionData);

  const transition = useNavigation();

  const [selectedPerson, setSelectedPerson] = useState<TUser>();

  const [query, setQuery] = useState("");

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) => {
          return user.email.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (!actionData?.toastMessage) {
      return;
    }
    if (actionData.toastMessage) {
      toast.success(actionData.toastMessage);
    }
  }, [actionData?.toastMessage]);

  return (
    <>
      {actionData?.toastMessage ? (
        <Toaster position="top-right" reverseOrder={false} />
      ) : null}
      <div className="relative sm:w-1/2 xl:w-1/3">
        <h2 className="mb-2 font-semibold">Add user to workplace</h2>
        <Form method="post">
          <div className="flex">
            <input
              type="hidden"
              name="userId"
              value={
                selectedPerson && selectedPerson.id ? selectedPerson.id : ""
              }
            />
            <input type="hidden" name="workplaceId" value={workplaceId} />
            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
              <Combobox.Input
                className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none rounded-lg focus:ring-0 "
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(user: any) => user.email}
              />
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute w-full py-1 overflow-auto text-base bg-white rounded-lg shadow-xl mt-14 max-h-60 ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredUsers.length === 0 && query !== "" ? (
                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                      Nothing found.
                    </div>
                  ) : (
                    filteredUsers.map((user: any) => (
                      <Combobox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-red-500 text-white" : "text-gray-900"
                          }`
                        }
                        key={user.id}
                        value={user}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {user.email}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                √
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </Combobox>
            <button
              type="submit"
              className=" duration-150 transform hover:scale-105 w-1/2   ml-4 text-xs px-6 py-1.5 font-bold text-white bg-red-500 rounded-lg"
            >
              {transition.state == "submitting" ? (
                <p>Adding User...</p>
              ) : (
                <p>Add User</p>
              )}
            </button>
          </div>
        </Form>
        <div>{actionData?.error_message ? actionData.error_message : null}</div>
      </div>
    </>
  );
};

export default AddUser;
