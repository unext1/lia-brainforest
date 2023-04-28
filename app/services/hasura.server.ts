import { GraphQLClient } from "graphql-request";
import jwt from "jsonwebtoken";

import { env } from "./env.server";
import { graphql } from "~/_gql";
import { TCreateWorkplace } from "~/types";

const HASURA_URL = `${env.HASURA_GRAPHQL_URL}/v1/graphql`;
export const createHasuraToken = (userId: string | undefined): string => {
  const payload = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["public", "user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": userId || "00000000-0000-0000-0000-000000000000",
    },
  };

  return jwt.sign(payload, env.HASURA_GRAPHQL_JWT_SECRET.key, {
    algorithm: env.HASURA_GRAPHQL_JWT_SECRET.type,
  });
};

export const hasuraAdminClient = new GraphQLClient(
  `${env.HASURA_GRAPHQL_URL}/v1/graphql`,
  {
    method: "post",
    headers: {
      "x-hasura-admin-secret": env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  }
);

export const hasuraClient = (token: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return new GraphQLClient(HASURA_URL, {
    method: "post",
    headers,
  });
};

export const CreateWorkplace = async (
  ownerId: string,
  token: string,
  url: string,
  title: string
) => {
  const workplace: TCreateWorkplace = await GetWorkplaceByURL(url);
  if (workplace) return workplace;
  return (await hasuraAdminClient.request(CREATEWORKPLACE, {
    ownerId,
    token,
    url,
    title,
  })) as TCreateWorkplace;
};

export const CREATEWORKPLACE = graphql(`
  mutation CreateWorkplace(
    $ownerId: uuid
    $token: String
    $url: String
    $title: String
  ) {
    insertLiaWorkplace(
      objects: { ownerId: $ownerId, token: $token, url: $url, title: $title }
      onConflict: { constraint: workplace_pkey }
    ) {
      affected_rows
      returning {
        id
        title
        url
        ownerId
      }
    }
  }
`);
export const GETWORKPLACEBYURL = graphql(`
  query GetWorkplaceByURL($url: String) {
    liaWorkplace(where: { url: { _eq: $url } }) {
      title
      token
      url
      ownerId
      id
    }
  }
`);
export const GETWORKPLACEBYID = graphql(`
  query GetWorkplaceById($id: uuid) {
    liaWorkplace(where: { id: { _eq: $id } }) {
      title
      token
      url
      ownerId
    }
  }
`);
export const GETWORKPLACES = graphql(`
  query GetWorkplaces($ownerId: uuid) {
    liaWorkplace(where: { ownerId: { _eq: $ownerId } }) {
      title
      token
      url
      ownerId
      id
    }
  }
`);
export const REMOVEWORKPLACE = graphql(`
  mutation DeleteWorkplace($url: String) {
    deleteLiaWorkplace(where: { url: { _eq: $url } }) {
      affected_rows
      returning {
        id
      }
    }
  }
`);

// CHANGE THIS TO GET IT WITH HASURA CLIENT AND IN PROPS PASS TOKEN
export const GetUserWorkplaces = async (ownerId: string) =>
  (await hasuraAdminClient.request(GETWORKPLACES, { ownerId })).liaWorkplace;
export const GetWorkplaceById = async (id: string) =>
  (await hasuraAdminClient.request(GETWORKPLACEBYID, { id })).liaWorkplace[0];
export const GetWorkplaceByURL = async (url: string) =>
  (await hasuraAdminClient.request(GETWORKPLACEBYURL, { url })).liaWorkplace[0];
