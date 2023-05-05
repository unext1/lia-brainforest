import { Dialog, Transition } from "@headlessui/react";
import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { requireUser } from "~/services/auth.server";
import {
  GetUsersFromWorkplace,
  IsOwnerOfWorkplace,
  RemoveWorkplaceMember,
} from "~/services/hasura.server";
import { type TUser } from "~/types";
export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);
  const { workplaceId } = params;

  if (workplaceId) {
    const workplaceMembers = await GetUsersFromWorkplace({
      token: user?.token!,
      workplaceId: workplaceId,
    });
    const isOwner = await IsOwnerOfWorkplace({
      token: user?.token!,
      userId: user?.id!,
      workplaceId: workplaceId!,
    });
    return json({ workplaceMembers, isOwner, workplaceId });
  }
  return {};
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const user = await requireUser(request);
  const { userId, workplaceId } = Object.fromEntries(formData) as {
    userId: string;
    workplaceId: string;
  };

  const deletedMember = await RemoveWorkplaceMember({
    token: user?.token!,
    userId,
    workplaceId,
  });
  return deletedMember;
}

export default function Index() {
  const { workplaceMembers, isOwner, workplaceId } = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, SetSelectedUser] = useState<TUser | null>(null);
  const deletedMember = useActionData();
  useEffect(() => {
    if (deletedMember) {
      toast.success("Member is now deleted", { duration: 4000 });
    }
  }, [deletedMember]);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const location = useLocation();

  return (
    <div>
      <div className="mt-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="my-auto text-lg font-semibold leading-6 text-gray-900">
              Workplace Members
            </h1>
          </div>
          <Toaster position="top-right" />
          {isOwner ? (
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                to={`${location.pathname}/adduser`}
                className="block px-3 py-2 text-sm font-semibold text-center text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Add user
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flow-root mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>

                    <th scope="col" className="relative py-3.5 pl-3 pr-4 ">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 rounded-xl ">
                  {workplaceMembers
                    ? workplaceMembers.map((i: any) => (
                        <tr key={i.workplaceMember.email}>
                          <td className="py-5 pl-4 pr-3 text-sm whitespace-nowrap ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-11 w-11">
                                <img
                                  className="rounded-full h-11 w-11"
                                  src={i.workplaceMember.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {i.workplaceMember.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                            <div className="mt-1 text-gray-500">
                              {i.workplaceMember.email}
                            </div>
                          </td>
                          <td className="px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20">
                              Active
                            </span>
                          </td>
                          <td className="relative py-5 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap ">
                            {isOwner ? (
                              <button
                                onClick={() => {
                                  SetSelectedUser(i.workplaceMember);
                                  openModal();
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                Edit
                                <span className="sr-only">
                                  , {i.workplaceMember.name}
                                </span>
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Remove User
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to remove {selectedUser?.name} ?
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Form method="post" className="w-full">
                      <input
                        name="userId"
                        value={selectedUser?.id}
                        type="hidden"
                      />
                      <input
                        name="workplaceId"
                        value={workplaceId}
                        type="hidden"
                      />
                      <div className="">
                        <button
                          type="submit"
                          onClick={closeModal}
                          className="inline-flex justify-center px-8 py-1.5 text-sm font-medium text-white bg-red-400 border border-transparent rounded-md hover:bg-red-500 focus:outline-none "
                        >
                          Yes
                        </button>
                      </div>
                    </Form>
                    <div className="">
                      <button
                        onClick={closeModal}
                        className="inline-flex justify-center px-8 py-1.5 text-sm font-medium text-black bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none "
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
