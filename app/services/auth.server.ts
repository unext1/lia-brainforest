import { graphql } from "~/_gql";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy } from "remix-auth-google";
import { createHasuraToken, hasuraAdminClient } from "./hasura.server";

export const authenticator = new Authenticator<any>(sessionStorage);

const CREATEUSER = graphql(`
  mutation AddUser($email: String, $name: String) {
    insertUser(
      objects: { email: $email, name: $name }
      onConflict: { constraint: user_email_key, update_columns: name }
    ) {
      returning {
        id
      }
    }
  }
`);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    const hasuraUser = await hasuraAdminClient.request(CREATEUSER, {
      name: profile.displayName || "No Name",
      email: profile.emails[0].value,
    });

    return {};
  }
);

authenticator.use(googleStrategy, "google");
