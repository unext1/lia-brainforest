import { Users } from "~/components/workplace/users";
import type { LoaderArgs } from "@remix-run/node";
import { requireUser } from "~/services/auth.server";
export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser(request);
  const { workplaceId } = params;
  return {};
}
export default function Index() {
  return (
    <div>
      <h2>Current users</h2>
      <Users />
    </div>
  );
}
