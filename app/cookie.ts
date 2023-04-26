import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const wordpressCookie = createCookie("wordpress", {});
export const authCookie = createCookie("supabase-auth-token", {});
