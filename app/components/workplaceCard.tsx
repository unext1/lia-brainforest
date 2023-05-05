import { Dialog, Transition } from "@headlessui/react";
import { Form, Link } from "@remix-run/react";
import { Fragment, useState } from "react";

const WorkplaceCard = ({
  workplace,
  remove,
}: {
  workplace: any;
  remove: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="w-full h-full p-5 transition-all transform bg-white rounded-xl hover:scale-105"
        key={workplace.id}
      >
        <div className="flex justify-between">
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
          {remove ? (
            <div>
              <button onClick={openModal} className="text-right text-red-1 ">
                X
              </button>
            </div>
          ) : null}
        </div>
        <Link to={`/dashboard/workplaces/${workplace.id}`}>
          <div className="mt-4">
            <h2 className="mt-1 text-sm font-semibold uppercase">
              {workplace.title}
            </h2>

            <div className="flex justify-between w-full mt-5 text-xs">
              <div className="">
                <p className="">Created At</p>
                <p>
                  {new Date(workplace.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="text-right">
                <p>Updated At</p>
                <p>
                  {new Date(workplace.updatedAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          </div>
        </Link>
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
                    Remove Workplace
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to remove your workplace ?
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Form
                      method="post"
                      action="/dashboard/workplaces"
                      className="w-full"
                    >
                      <input
                        name="workplaceId"
                        value={workplace.id}
                        type="hidden"
                      />
                      <div className="">
                        <button
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
    </>
  );
};
export default WorkplaceCard;
