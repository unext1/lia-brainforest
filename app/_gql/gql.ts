/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetUserByEmail($email: String) {\n    liaUser(where: { email: { _eq: $email } }) {\n      id\n      email\n      name\n    }\n  }\n": types.GetUserByEmailDocument,
    "\n  mutation AddUser($email: String, $name: String) {\n    insertLiaUser(\n      objects: { email: $email, name: $name }\n      onConflict: { constraint: user_email_key, update_columns: name }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.AddUserDocument,
    "\n  query UserById($userId: uuid!) {\n    user: liaUserByPk(id: $userId) {\n      createdAt\n      email\n      id\n      name\n      updatedAt\n    }\n  }\n": types.UserByIdDocument,
    "\n  mutation CreateWorkplace(\n    $ownerId: uuid\n    $token: String\n    $url: String\n    $title: String\n  ) {\n    insertLiaWorkplace(\n      objects: { ownerId: $ownerId, token: $token, url: $url, title: $title }\n      onConflict: { constraint: workplace_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        title\n        url\n        ownerId\n      }\n    }\n  }\n": types.CreateWorkplaceDocument,
    "\n  query GetWorkplaceByURL($url: String) {\n    liaWorkplace(where: { url: { _eq: $url } }) {\n      title\n      token\n      url\n      ownerId\n      id\n    }\n  }\n": types.GetWorkplaceByUrlDocument,
    "\n  query GetWorkplaceById($id: uuid) {\n    liaWorkplace(where: { id: { _eq: $id } }) {\n      title\n      token\n      url\n      ownerId\n    }\n  }\n": types.GetWorkplaceByIdDocument,
    "\n  query GetWorkplaces($ownerId: uuid) {\n    liaWorkplace(where: { ownerId: { _eq: $ownerId } }) {\n      title\n      token\n      url\n      ownerId\n      id\n    }\n  }\n": types.GetWorkplacesDocument,
    "\n  mutation DeleteWorkplace($url: String) {\n    deleteLiaWorkplace(where: { url: { _eq: $url } }) {\n      affected_rows\n      returning {\n        id\n      }\n    }\n  }\n": types.DeleteWorkplaceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserByEmail($email: String) {\n    liaUser(where: { email: { _eq: $email } }) {\n      id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUserByEmail($email: String) {\n    liaUser(where: { email: { _eq: $email } }) {\n      id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUser($email: String, $name: String) {\n    insertLiaUser(\n      objects: { email: $email, name: $name }\n      onConflict: { constraint: user_email_key, update_columns: name }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($email: String, $name: String) {\n    insertLiaUser(\n      objects: { email: $email, name: $name }\n      onConflict: { constraint: user_email_key, update_columns: name }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserById($userId: uuid!) {\n    user: liaUserByPk(id: $userId) {\n      createdAt\n      email\n      id\n      name\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query UserById($userId: uuid!) {\n    user: liaUserByPk(id: $userId) {\n      createdAt\n      email\n      id\n      name\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWorkplace(\n    $ownerId: uuid\n    $token: String\n    $url: String\n    $title: String\n  ) {\n    insertLiaWorkplace(\n      objects: { ownerId: $ownerId, token: $token, url: $url, title: $title }\n      onConflict: { constraint: workplace_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        title\n        url\n        ownerId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWorkplace(\n    $ownerId: uuid\n    $token: String\n    $url: String\n    $title: String\n  ) {\n    insertLiaWorkplace(\n      objects: { ownerId: $ownerId, token: $token, url: $url, title: $title }\n      onConflict: { constraint: workplace_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        title\n        url\n        ownerId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceByURL($url: String) {\n    liaWorkplace(where: { url: { _eq: $url } }) {\n      title\n      token\n      url\n      ownerId\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceByURL($url: String) {\n    liaWorkplace(where: { url: { _eq: $url } }) {\n      title\n      token\n      url\n      ownerId\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceById($id: uuid) {\n    liaWorkplace(where: { id: { _eq: $id } }) {\n      title\n      token\n      url\n      ownerId\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceById($id: uuid) {\n    liaWorkplace(where: { id: { _eq: $id } }) {\n      title\n      token\n      url\n      ownerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaces($ownerId: uuid) {\n    liaWorkplace(where: { ownerId: { _eq: $ownerId } }) {\n      title\n      token\n      url\n      ownerId\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaces($ownerId: uuid) {\n    liaWorkplace(where: { ownerId: { _eq: $ownerId } }) {\n      title\n      token\n      url\n      ownerId\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkplace($url: String) {\n    deleteLiaWorkplace(where: { url: { _eq: $url } }) {\n      affected_rows\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkplace($url: String) {\n    deleteLiaWorkplace(where: { url: { _eq: $url } }) {\n      affected_rows\n      returning {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;