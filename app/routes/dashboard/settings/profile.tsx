import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProfileCard } from "~/components/profilecard";
import { requireUser } from "~/services/auth.server";
import type { TUser } from "~/types";
export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return { user };
}

const Profile = () => {
  const { user } = useLoaderData<{ user: TUser }>();
  console.table(user);
  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-4 text-xl font-semibold">Account details</h2>
      <ProfileCard name={user.name} email={user.email} image={user.image} />
    </div>
  );
};

export default Profile;
