import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { graphql } from "~/_gql";
import { createHasuraToken, hasuraAdminClient } from "./hasura.server";
import { sessionStore } from "~/services/session.server";
import { json, redirect } from "@remix-run/node";
import { TUserWToken } from "~/types";

type UserSession = {
  id: string;
  email: string;
  token: string;
};

export const authenticator = new Authenticator<UserSession>(sessionStore);

const CREATEORUPDATEUSER = graphql(`
  mutation AddUser($email: String, $name: String, $image: String) {
    insertLiaUser(
      objects: { email: $email, name: $name, image: $image }
      onConflict: { constraint: user_email_key, update_columns: [name, image] }
    ) {
      returning {
        id
        email
        name
      }
    }
  }
`);

const GETUSERBYID: any = graphql(`
  query UserById($userId: uuid!) {
    user: liaUserByPk(id: $userId) {
      createdAt
      email
      id
      name
      updatedAt
      image
    }
  }
`);

export const requireUser = async (request: Request) => {
  try {
    const sessionUser = await authenticator.isAuthenticated(request);

    if (!sessionUser || !sessionUser.id) {
      throw Error("Unauthorized");
    }

    const user: any = await hasuraAdminClient.request(GETUSERBYID, {
      userId: sessionUser.id,
    });

    if (user?.user && user.user?.id) {
      return { ...user.user, token: sessionUser?.token } as TUserWToken;
    }
    throw Error("Unauthorized");
  } catch (error) {
    await authenticator.logout(request, { redirectTo: "/" });
  }
};
export const redirectUser = async (request: Request, redirect_url: string) => {
  const user = await authenticator.isAuthenticated(request);
  if (user) return redirect(redirect_url);
  else return null;
};
export const createOrUpdateUser = async ({
  email,
  name,
  image,
}: {
  email: string;
  name: string;
  image: string;
}) => {
  const newUser = await hasuraAdminClient.request(CREATEORUPDATEUSER, {
    name,
    email,
    image,
  });
  const user = newUser.insertLiaUser?.returning?.[0];
  if (!user?.id) {
    throw Error("Unauthorized");
  }
  const token = createHasuraToken(user.id);
  return { id: user.id, email: user.email, token };
};

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async ({ profile }) => {
    const {
      displayName: name,
      _json: { email },
    } = profile;
    const image = profile.photos[0].value;
    return await createOrUpdateUser({
      email,
      name,
      image,
    });
  }
);

authenticator.use(googleStrategy, "google");
