import { graphql } from "~/_gql";
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { createHasuraToken, hasuraAdminClient } from "./hasura.server";
import { sessionStore } from "~/services/session.server";

type UserSession = {
  id: string;
  email: string;
  token: string;
};

export const authenticator = new Authenticator<UserSession>(sessionStore);

const GETUSERBYEMAIL = graphql(`
  query GetUserByEmail($email: String) {
    liaUser(where: { email: { _eq: $email } }) {
      id
      email
      name
    }
  }
`);

const CREATEORUPDATEUSER = graphql(`
  mutation AddUser($email: String, $name: String) {
    insertLiaUser(
      objects: { email: $email, name: $name }
      onConflict: { constraint: user_email_key, update_columns: name }
    ) {
      returning {
        id
        email
        name
      }
    }
  }
`);

const GETUSERBYID = graphql(`
  query UserById($userId: uuid!) {
    user: liaUserByPk(id: $userId) {
      createdAt
      email
      id
      name
      updatedAt
    }
  }
`);

export const requireUser = async (request: Request) => {
  try {
    const sessionUser = await authenticator.isAuthenticated(request);

    if (!sessionUser || !sessionUser.id) {
      throw Error("Unauthorized");
    }

    const user = await hasuraAdminClient.request(GETUSERBYID, {
      userId: sessionUser.id,
    });

    if (user?.user && user.user?.id) {
      return { user: { ...user.user }, token: sessionUser.token };
    }
    throw Error("Unauthorized");
  } catch (error) {
    await authenticator.logout(request, { redirectTo: "/" });
  }
};

export const createOrUpdateUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const newUser = await hasuraAdminClient.request(CREATEORUPDATEUSER, {
    name,
    email,
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
    return createOrUpdateUser({
      email,
      name,
    });
  }
);

authenticator.use(googleStrategy, "google");
