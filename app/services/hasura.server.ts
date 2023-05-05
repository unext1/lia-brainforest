import { GraphQLClient } from "graphql-request";
import jwt from "jsonwebtoken";
import { graphql } from "~/_gql";
import type { TWorkplace } from "~/types";
import { env } from "./env.server";

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
  const newWorkplace = (await hasuraAdminClient.request(CREATEWORKPLACE, {
    ownerId,
    token,
    url,
    title,
  })) as any;
  return newWorkplace.insertLiaWorkplace?.returning?.[0] as TWorkplace;
};
export const RemoveWorkplace = async (id: string) => {
  await hasuraAdminClient.request(REMOVEWORKPLACEMEMBERS, { id });
  return await hasuraAdminClient.request(REMOVEWORKPLACE, { id });
};

export const CREATEWORKPLACE: any = graphql(`
  mutation CreateWorkplace(
    $ownerId: uuid
    $token: String
    $url: String
    $title: String
  ) {
    insertLiaWorkplace(
      objects: { ownerId: $ownerId, token: $token, url: $url, title: $title }
      onConflict: { constraint: workplace_url_key, update_columns: title }
    ) {
      returning {
        id
        title
        url
        ownerId
        updatedAt
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
      updatedAt
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
export const GETWORKPLACES: any = graphql(`
  query GetWorkplaces {
    liaWorkplace {
      title
      token
      url
      ownerId
      id
      updatedAt
      createdAt
    }
  }
`);
export const GETOWNEROFWORKPLACE: any = graphql(`
  query GetOwnerofWorkplace($userId: uuid, $workplaceId: uuid) {
    liaWorkplace(
      where: { _and: { ownerId: { _eq: $userId }, id: { _eq: $workplaceId } } }
    ) {
      id
    }
  }
`);
const GETWORKPLACEMEMBERS = graphql(`
  query GetWorkplaceMemebers($workplaceId: uuid!) {
    liaWorkplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {
      workplaceMember {
        email
        id
        name
        image
      }
    }
  }
`);
export const REMOVEWORKPLACEMEMBER: any = graphql(`
  mutation RemoveWorkplaceMember($userId: uuid, $workplaceId: uuid) {
    deleteLiaWorkplaceMember(
      where: {
        _and: { userId: { _eq: $userId }, workplaceId: { _eq: $workplaceId } }
      }
    ) {
      affected_rows
    }
  }
`);
export const REMOVEWORKPLACE: any = graphql(`
  mutation DeleteWorkplace($id: uuid) {
    deleteLiaWorkplace(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
    }
  }
`);

export const INVITEUSERTOWORKPLACE = graphql(`
  mutation InviteUser($userId: uuid!, $workplaceId: uuid!) {
    insertLiaWorkplaceMember(
      objects: { userId: $userId, workplaceId: $workplaceId }
    ) {
      affected_rows
    }
  }
`);
export const REMOVEWORKPLACEMEMBERS: any = graphql(`
  mutation RemoveWorkplaceMembers($id: uuid) {
    deleteLiaWorkplaceMember(where: { workplaceId: { _eq: $id } }) {
      affected_rows
    }
  }
`);

export const GetUserWorkplaces = async ({ token }: { token: string }) => {
  return (
    await hasuraClient(token).request<{ liaWorkplace: TWorkplace[] }>(
      GETWORKPLACES
    )
  ).liaWorkplace;
};
export const RemoveWorkplaceMember = async ({
  token,
  userId,
  workplaceId,
}: {
  token: string;
  userId: string;
  workplaceId: string;
}) =>
  (
    await hasuraClient(token).request<{
      deleteLiaWorkplaceMember: { affected_rows: number };
    }>(REMOVEWORKPLACEMEMBER, {
      userId,
      workplaceId,
    })
  ).deleteLiaWorkplaceMember;
export const IsOwnerOfWorkplace = async ({
  token,
  userId,
  workplaceId,
}: {
  token: string;
  userId: string;
  workplaceId: string;
}) => {
  const liaWorkplace = (
    await hasuraClient(token).request<{
      liaWorkplace: { id: string }[];
    }>(GETOWNEROFWORKPLACE, { userId, workplaceId })
  ).liaWorkplace;
  return liaWorkplace.length > 0 ? true : false;
};
export const GetUsersFromWorkplace = async ({
  token,
  workplaceId,
}: {
  token: string;
  workplaceId: string;
}) =>
  (await hasuraClient(token).request(GETWORKPLACEMEMBERS, { workplaceId }))
    .liaWorkplaceMember;

export const GetWorkplaceById = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  (await hasuraClient(token).request(GETWORKPLACEBYID, { id })).liaWorkplace[0];

export const GetWorkplaceByURL = async ({
  token,
  url,
}: {
  token: string;
  url: string;
}) =>
  (await hasuraClient(token).request(GETWORKPLACEBYURL, { url }))
    .liaWorkplace[0];

export const GETPUBLICUSERS = graphql(`
  query GetPublicUsers {
    liaPublicUser {
      id
      name
      email
    }
  }
`);

export const GetPublicUsers = async () =>
  (await hasuraAdminClient.request(GETPUBLICUSERS)).liaPublicUser;
