import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { requireUser } from "~/services/auth.server";
import { GetUserWorkplaces, RemoveWorkplace } from "~/services/hasura.server";
import { TWorkplace } from "~/types";
import { useState } from "react";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  const workplaces = await GetUserWorkplaces({ token: user?.token! });
  return { workplaces };
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { _id, _remove } = Object.fromEntries(formData);
  if (_remove === "true") {
    await RemoveWorkplace(_id as string);
    return { deleted: true };
  } else return null;
}
const Workspaces = () => {
  const { workplaces } = useLoaderData();
  const actionData = useActionData();
  const [removeWorkplace, setRemoveWorkplace] = useState<{
    id: string;
    remove: boolean;
  }>();
  return (
    <div className="w-[80%]">
      <div className="flex justify-between w-full px-1 pb-2 border-b border-b-gray-300">
        <p>Name</p>
        {/* <div className="flex gap-10">
          <p>Last changed</p>
        </div> */}
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
            {/* <p>{new Date(workplace.updatedAt).toDateString()}</p> */}
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
          <input hidden value={removeWorkplace?.id} name="_id" />
          <input
            hidden
            value={removeWorkplace?.remove ? "true" : "false"}
            name="_remove"
          />
          <label>Are you sure you want to remove your workplace?</label>
          <div className="flex gap-6">
            <button className="cursor-pointer " type="submit">
              Yes
            </button>
            <button
              onClick={() => setRemoveWorkplace({ id: "", remove: false })}
            >
              No
            </button>
          </div>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Workspaces;
