import { Combobox } from "@headlessui/react";
import { json, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  GetPublicUsers,
  hasuraClient,
  INVITEUSERTOWORKPLACE,
} from "~/services/hasura.server";

import type { ActionArgs } from "@remix-run/node";
import { requireUser } from "~/services/auth.server";
import { zx } from "zodix";
import { z } from "zod";

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);

  const { userId, workplaceId } = await zx.parseForm(request, {
    userId: z.string(),
    workplaceId: z.string(),
  });

  if (user) {
    return await hasuraClient(user?.token).request(INVITEUSERTOWORKPLACE, {
      userId: userId,
      workplaceId: workplaceId,
    });
  } else throw Error("Unauthorized");
}

export async function loader({ params }: LoaderArgs) {
  const { workplaceId } = params;

  const users = await GetPublicUsers();
  return json({ users, workplaceId });
}

const AddUser = () => {
  const { users, workplaceId } = useLoaderData<typeof loader>();
  const [selectedPerson, setSelectedPerson] = useState<typeof users[0]>({});
  const [query, setQuery] = useState("");

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user: any) => {
          return user.email.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <h2>Add user to workplace</h2>
      <Form method="post">
        <input
          type="hidden"
          name="userId"
          value={selectedPerson && selectedPerson.id ? selectedPerson.id : ""}
        />
        <input type="hidden" name="workplaceId" value={workplaceId} />
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(user: any) => user.email}
          />
          <Combobox.Options>
            {filteredUsers.map((user: any) => (
              <Combobox.Option key={user.id} value={user}>
                {user.email}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default AddUser;
