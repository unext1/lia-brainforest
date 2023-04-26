import { createCookieSessionStorage } from "@remix-run/node";

export type User = {
  id: string | null;
  email: string;
  name: string;
  token: string;
};

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.JWT_SECRET_KEY!],
    secure: process.env.NODE_ENV === "production",
  },
});
