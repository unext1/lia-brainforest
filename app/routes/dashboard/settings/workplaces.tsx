import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { requireUser } from "~/services/auth.server";
import { GetUserWorkplaces, RemoveWorkplace } from "~/services/hasura.server";
import { type TWorkplace } from "~/types";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  const workplaces = await GetUserWorkplaces({ token: user?.token! });
  return { workplaces };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { workplaceId, _action } = Object.fromEntries(formData);
  console.log(workplaceId, _action);
  if (_action === "remove") {
    await RemoveWorkplace(workplaceId as string);
    return { deleted: true };
  }
  return {};
}

const Workspaces = () => {
  const { workplaces } = useLoaderData();
  const actionData = useActionData();
  const [removeWorkplace, setRemoveWorkplace] = useState<{
    id: string;
    remove: boolean;
  }>();
  return (
    <div className=" max-w-full lg:w-[80%]">
      <div className="flex justify-between w-full px-1 pb-2 border-b border-b-gray-300">
        <p>Name</p>
        <div className="flex gap-10">
          <p>Actions</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2 ">
        {workplaces?.map((workplace: TWorkplace) => (
          <div
            key={workplace.id}
            className="flex items-center justify-between w-full gap-1 p-1 border-b rounded-sm group border-b-gray-200 hover:border-b-gray-300 "
          >
            <h4 className="font-semibold ">{workplace.title}</h4>
            <button
              onClick={() =>
                setRemoveWorkplace({ id: workplace.id, remove: true })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {!actionData?.deleted ? (
        <Form
          method="post"
          className={removeWorkplace?.remove ? "block" : "hidden"}
        >
          <input hidden value={removeWorkplace?.id} name="workplaceId" />
          <label>Are you sure you want to remove your workplace?</label>
          <div className="flex gap-6">
            <button
              className="cursor-pointer"
              type="submit"
              name="_action"
              value="remove"
            >
              Yes
            </button>
            <button
              onClick={() => setRemoveWorkplace({ id: "", remove: false })}
            >
              No
            </button>
          </div>
        </Form>
      ) : null}
    </div>
  );
};

export default Workspaces;
