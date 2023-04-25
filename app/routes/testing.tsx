import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { type LoaderArgs, json } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );

  const { data } = await supabase.from("profiles").select();
  return { data, headers: response.headers };
}

const Testing = () => {
  const data = useLoaderData();
  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};
export default Testing;
