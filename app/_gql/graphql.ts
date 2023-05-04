/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
};

/** ordering argument of a cursor */
export type CursorOrdering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "lia.public_user" */
export type LiaPublicUser = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregated selection of "lia.public_user" */
export type LiaPublicUserAggregate = {
  aggregate?: Maybe<LiaPublicUserAggregateFields>;
  nodes: Array<LiaPublicUser>;
};

/** aggregate fields of "lia.public_user" */
export type LiaPublicUserAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<LiaPublicUserMaxFields>;
  min?: Maybe<LiaPublicUserMinFields>;
};


/** aggregate fields of "lia.public_user" */
export type LiaPublicUserAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<LiaPublicUserSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "lia.public_user". All fields are combined with a logical 'AND'. */
export type LiaPublicUserBoolExp = {
  _and?: InputMaybe<Array<LiaPublicUserBoolExp>>;
  _not?: InputMaybe<LiaPublicUserBoolExp>;
  _or?: InputMaybe<Array<LiaPublicUserBoolExp>>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
};

/** input type for inserting data into table "lia.public_user" */
export type LiaPublicUserInsertInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type LiaPublicUserMaxFields = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type LiaPublicUserMinFields = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "lia.public_user" */
export type LiaPublicUserMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LiaPublicUser>;
};

/** Ordering options when selecting data from "lia.public_user". */
export type LiaPublicUserOrderBy = {
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

/** select columns of table "lia.public_user" */
export type LiaPublicUserSelectColumn =
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name';

/** input type for updating data in table "lia.public_user" */
export type LiaPublicUserSetInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "lia_public_user" */
export type LiaPublicUserStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: LiaPublicUserStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type LiaPublicUserStreamCursorValueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

export type LiaPublicUserUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<LiaPublicUserSetInput>;
  where: LiaPublicUserBoolExp;
};

/** columns and relationships of "lia.user" */
export type LiaUser = {
  createdAt: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['uuid'];
  image?: Maybe<Scalars['String']>;
  /** An aggregate relationship */
  memberOfWorkplacesAggregate: LiaWorkplaceMemberAggregate;
  /** An array relationship */
  member_of_workplaces: Array<LiaWorkplaceMember>;
  name: Scalars['String'];
  /** An aggregate relationship */
  ownerOfWorkplacesAggregate: LiaWorkplaceAggregate;
  /** An array relationship */
  owner_of_workplaces: Array<LiaWorkplace>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "lia.user" */
export type LiaUserMemberOfWorkplacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


/** columns and relationships of "lia.user" */
export type LiaUserMember_Of_WorkplacesArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


/** columns and relationships of "lia.user" */
export type LiaUserOwnerOfWorkplacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceOrderBy>>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};


/** columns and relationships of "lia.user" */
export type LiaUserOwner_Of_WorkplacesArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceOrderBy>>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};

/** aggregated selection of "lia.user" */
export type LiaUserAggregate = {
  aggregate?: Maybe<LiaUserAggregateFields>;
  nodes: Array<LiaUser>;
};

/** aggregate fields of "lia.user" */
export type LiaUserAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<LiaUserMaxFields>;
  min?: Maybe<LiaUserMinFields>;
};


/** aggregate fields of "lia.user" */
export type LiaUserAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<LiaUserSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "lia.user". All fields are combined with a logical 'AND'. */
export type LiaUserBoolExp = {
  _and?: InputMaybe<Array<LiaUserBoolExp>>;
  _not?: InputMaybe<LiaUserBoolExp>;
  _or?: InputMaybe<Array<LiaUserBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  image?: InputMaybe<StringComparisonExp>;
  member_of_workplaces?: InputMaybe<LiaWorkplaceMemberBoolExp>;
  member_of_workplaces_aggregate?: InputMaybe<Lia_Workplace_Member_Aggregate_Bool_Exp>;
  name?: InputMaybe<StringComparisonExp>;
  owner_of_workplaces?: InputMaybe<LiaWorkplaceBoolExp>;
  owner_of_workplaces_aggregate?: InputMaybe<Lia_Workplace_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "lia.user" */
export type LiaUserConstraint =
  /** unique or primary key constraint on columns "email" */
  | 'user_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'user_pkey';

/** input type for inserting data into table "lia.user" */
export type LiaUserInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  member_of_workplaces?: InputMaybe<LiaWorkplaceMemberArrRelInsertInput>;
  name?: InputMaybe<Scalars['String']>;
  owner_of_workplaces?: InputMaybe<LiaWorkplaceArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type LiaUserMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type LiaUserMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "lia.user" */
export type LiaUserMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LiaUser>;
};

/** input type for inserting object relation for remote table "lia.user" */
export type LiaUserObjRelInsertInput = {
  data: LiaUserInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<LiaUserOnConflict>;
};

/** on_conflict condition type for table "lia.user" */
export type LiaUserOnConflict = {
  constraint: LiaUserConstraint;
  update_columns?: Array<LiaUserUpdateColumn>;
  where?: InputMaybe<LiaUserBoolExp>;
};

/** Ordering options when selecting data from "lia.user". */
export type LiaUserOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  image?: InputMaybe<OrderBy>;
  member_of_workplacesAggregate?: InputMaybe<LiaWorkplaceMemberAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  owner_of_workplacesAggregate?: InputMaybe<LiaWorkplaceAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: lia.user */
export type LiaUserPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "lia.user" */
export type LiaUserSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "lia.user" */
export type LiaUserSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "lia_user" */
export type LiaUserStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: LiaUserStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type LiaUserStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "lia.user" */
export type LiaUserUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

export type LiaUserUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<LiaUserSetInput>;
  where: LiaUserBoolExp;
};

/** columns and relationships of "lia.workplace" */
export type LiaWorkplace = {
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  owner: LiaUser;
  ownerId: Scalars['uuid'];
  title?: Maybe<Scalars['String']>;
  token: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  url: Scalars['String'];
  /** An aggregate relationship */
  workplaceMembersAggregate: LiaWorkplaceMemberAggregate;
  /** An array relationship */
  workplace_members: Array<LiaWorkplaceMember>;
};


/** columns and relationships of "lia.workplace" */
export type LiaWorkplaceWorkplaceMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


/** columns and relationships of "lia.workplace" */
export type LiaWorkplaceWorkplace_MembersArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};

/** aggregated selection of "lia.workplace" */
export type LiaWorkplaceAggregate = {
  aggregate?: Maybe<LiaWorkplaceAggregateFields>;
  nodes: Array<LiaWorkplace>;
};

/** aggregate fields of "lia.workplace" */
export type LiaWorkplaceAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<LiaWorkplaceMaxFields>;
  min?: Maybe<LiaWorkplaceMinFields>;
};


/** aggregate fields of "lia.workplace" */
export type LiaWorkplaceAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "lia.workplace" */
export type LiaWorkplaceAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Lia_Workplace_Max_Order_By>;
  min?: InputMaybe<Lia_Workplace_Min_Order_By>;
};

/** input type for inserting array relation for remote table "lia.workplace" */
export type LiaWorkplaceArrRelInsertInput = {
  data: Array<LiaWorkplaceInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<LiaWorkplaceOnConflict>;
};

/** Boolean expression to filter rows from the table "lia.workplace". All fields are combined with a logical 'AND'. */
export type LiaWorkplaceBoolExp = {
  _and?: InputMaybe<Array<LiaWorkplaceBoolExp>>;
  _not?: InputMaybe<LiaWorkplaceBoolExp>;
  _or?: InputMaybe<Array<LiaWorkplaceBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  owner?: InputMaybe<LiaUserBoolExp>;
  ownerId?: InputMaybe<UuidComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  token?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  url?: InputMaybe<StringComparisonExp>;
  workplace_members?: InputMaybe<LiaWorkplaceMemberBoolExp>;
  workplace_members_aggregate?: InputMaybe<Lia_Workplace_Member_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "lia.workplace" */
export type LiaWorkplaceConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'workplace_pkey'
  /** unique or primary key constraint on columns "token" */
  | 'workplace_token_key'
  /** unique or primary key constraint on columns "url" */
  | 'workplace_url_key';

/** input type for inserting data into table "lia.workplace" */
export type LiaWorkplaceInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<LiaUserObjRelInsertInput>;
  ownerId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
  workplace_members?: InputMaybe<LiaWorkplaceMemberArrRelInsertInput>;
};

/** aggregate max on columns */
export type LiaWorkplaceMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  ownerId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** columns and relationships of "lia.workplace_member" */
export type LiaWorkplaceMember = {
  /** An object relationship */
  user: LiaUser;
  userId: Scalars['uuid'];
  /** An object relationship */
  workplace: LiaWorkplace;
  workplaceId: Scalars['uuid'];
};

/** aggregated selection of "lia.workplace_member" */
export type LiaWorkplaceMemberAggregate = {
  aggregate?: Maybe<LiaWorkplaceMemberAggregateFields>;
  nodes: Array<LiaWorkplaceMember>;
};

/** aggregate fields of "lia.workplace_member" */
export type LiaWorkplaceMemberAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<LiaWorkplaceMemberMaxFields>;
  min?: Maybe<LiaWorkplaceMemberMinFields>;
};


/** aggregate fields of "lia.workplace_member" */
export type LiaWorkplaceMemberAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "lia.workplace_member" */
export type LiaWorkplaceMemberAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Lia_Workplace_Member_Max_Order_By>;
  min?: InputMaybe<Lia_Workplace_Member_Min_Order_By>;
};

/** input type for inserting array relation for remote table "lia.workplace_member" */
export type LiaWorkplaceMemberArrRelInsertInput = {
  data: Array<LiaWorkplaceMemberInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<LiaWorkplaceMemberOnConflict>;
};

/** Boolean expression to filter rows from the table "lia.workplace_member". All fields are combined with a logical 'AND'. */
export type LiaWorkplaceMemberBoolExp = {
  _and?: InputMaybe<Array<LiaWorkplaceMemberBoolExp>>;
  _not?: InputMaybe<LiaWorkplaceMemberBoolExp>;
  _or?: InputMaybe<Array<LiaWorkplaceMemberBoolExp>>;
  user?: InputMaybe<LiaUserBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
  workplace?: InputMaybe<LiaWorkplaceBoolExp>;
  workplaceId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "lia.workplace_member" */
export type LiaWorkplaceMemberConstraint =
  /** unique or primary key constraint on columns "workplace_id", "user_id" */
  | 'workplace_member_pkey';

/** input type for inserting data into table "lia.workplace_member" */
export type LiaWorkplaceMemberInsertInput = {
  user?: InputMaybe<LiaUserObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']>;
  workplace?: InputMaybe<LiaWorkplaceObjRelInsertInput>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type LiaWorkplaceMemberMaxFields = {
  userId?: Maybe<Scalars['uuid']>;
  workplaceId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type LiaWorkplaceMemberMinFields = {
  userId?: Maybe<Scalars['uuid']>;
  workplaceId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "lia.workplace_member" */
export type LiaWorkplaceMemberMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LiaWorkplaceMember>;
};

/** on_conflict condition type for table "lia.workplace_member" */
export type LiaWorkplaceMemberOnConflict = {
  constraint: LiaWorkplaceMemberConstraint;
  update_columns?: Array<LiaWorkplaceMemberUpdateColumn>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};

/** Ordering options when selecting data from "lia.workplace_member". */
export type LiaWorkplaceMemberOrderBy = {
  user?: InputMaybe<LiaUserOrderBy>;
  userId?: InputMaybe<OrderBy>;
  workplace?: InputMaybe<LiaWorkplaceOrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: lia.workplace_member */
export type LiaWorkplaceMemberPkColumnsInput = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};

/** select columns of table "lia.workplace_member" */
export type LiaWorkplaceMemberSelectColumn =
  /** column name */
  | 'userId'
  /** column name */
  | 'workplaceId';

/** input type for updating data in table "lia.workplace_member" */
export type LiaWorkplaceMemberSetInput = {
  userId?: InputMaybe<Scalars['uuid']>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "lia_workplace_member" */
export type LiaWorkplaceMemberStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: LiaWorkplaceMemberStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type LiaWorkplaceMemberStreamCursorValueInput = {
  userId?: InputMaybe<Scalars['uuid']>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "lia.workplace_member" */
export type LiaWorkplaceMemberUpdateColumn =
  /** column name */
  | 'userId'
  /** column name */
  | 'workplaceId';

export type LiaWorkplaceMemberUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<LiaWorkplaceMemberSetInput>;
  where: LiaWorkplaceMemberBoolExp;
};

/** aggregate min on columns */
export type LiaWorkplaceMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  ownerId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "lia.workplace" */
export type LiaWorkplaceMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LiaWorkplace>;
};

/** input type for inserting object relation for remote table "lia.workplace" */
export type LiaWorkplaceObjRelInsertInput = {
  data: LiaWorkplaceInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<LiaWorkplaceOnConflict>;
};

/** on_conflict condition type for table "lia.workplace" */
export type LiaWorkplaceOnConflict = {
  constraint: LiaWorkplaceConstraint;
  update_columns?: Array<LiaWorkplaceUpdateColumn>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};

/** Ordering options when selecting data from "lia.workplace". */
export type LiaWorkplaceOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  owner?: InputMaybe<LiaUserOrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  workplace_membersAggregate?: InputMaybe<LiaWorkplaceMemberAggregateOrderBy>;
};

/** primary key columns input for table: lia.workplace */
export type LiaWorkplacePkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "lia.workplace" */
export type LiaWorkplaceSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'title'
  /** column name */
  | 'token'
  /** column name */
  | 'updatedAt'
  /** column name */
  | 'url';

/** input type for updating data in table "lia.workplace" */
export type LiaWorkplaceSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  ownerId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "lia_workplace" */
export type LiaWorkplaceStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: LiaWorkplaceStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type LiaWorkplaceStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  ownerId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
};

/** update columns of table "lia.workplace" */
export type LiaWorkplaceUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'title'
  /** column name */
  | 'token'
  /** column name */
  | 'updatedAt'
  /** column name */
  | 'url';

export type LiaWorkplaceUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<LiaWorkplaceSetInput>;
  where: LiaWorkplaceBoolExp;
};

/** column ordering options */
export type OrderBy =
  /** in ascending order, nulls last */
  | 'ASC'
  /** in ascending order, nulls first */
  | 'ASC_NULLS_FIRST'
  /** in ascending order, nulls last */
  | 'ASC_NULLS_LAST'
  /** in descending order, nulls first */
  | 'DESC'
  /** in descending order, nulls first */
  | 'DESC_NULLS_FIRST'
  /** in descending order, nulls last */
  | 'DESC_NULLS_LAST';

/** columns and relationships of "product" */
export type Product = {
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An aggregate relationship */
  productPricesAggregate: ProductPriceAggregate;
  /** An array relationship */
  product_prices: Array<ProductPrice>;
  stripeProductId: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  workplace: Workplace;
  workplaceId: Scalars['uuid'];
};


/** columns and relationships of "product" */
export type ProductProductPricesAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProductPriceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductPriceOrderBy>>;
  where?: InputMaybe<ProductPriceBoolExp>;
};


/** columns and relationships of "product" */
export type ProductProduct_PricesArgs = {
  distinctOn?: InputMaybe<Array<ProductPriceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductPriceOrderBy>>;
  where?: InputMaybe<ProductPriceBoolExp>;
};

/** aggregated selection of "product" */
export type ProductAggregate = {
  aggregate?: Maybe<ProductAggregateFields>;
  nodes: Array<Product>;
};

/** aggregate fields of "product" */
export type ProductAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<ProductMaxFields>;
  min?: Maybe<ProductMinFields>;
};


/** aggregate fields of "product" */
export type ProductAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ProductSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "product". All fields are combined with a logical 'AND'. */
export type ProductBoolExp = {
  _and?: InputMaybe<Array<ProductBoolExp>>;
  _not?: InputMaybe<ProductBoolExp>;
  _or?: InputMaybe<Array<ProductBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  product_prices?: InputMaybe<ProductPriceBoolExp>;
  product_prices_aggregate?: InputMaybe<Product_Price_Aggregate_Bool_Exp>;
  stripeProductId?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  workplace?: InputMaybe<WorkplaceBoolExp>;
  workplaceId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "product" */
export type ProductConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'product_pkey'
  /** unique or primary key constraint on columns "stripe_product_id" */
  | 'product_stripe_product_id_key';

/** input type for inserting data into table "product" */
export type ProductInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  product_prices?: InputMaybe<ProductPriceArrRelInsertInput>;
  stripeProductId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workplace?: InputMaybe<WorkplaceObjRelInsertInput>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type ProductMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  stripeProductId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  workplaceId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProductMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  stripeProductId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  workplaceId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "product" */
export type ProductMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Product>;
};

/** input type for inserting object relation for remote table "product" */
export type ProductObjRelInsertInput = {
  data: ProductInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<ProductOnConflict>;
};

/** on_conflict condition type for table "product" */
export type ProductOnConflict = {
  constraint: ProductConstraint;
  update_columns?: Array<ProductUpdateColumn>;
  where?: InputMaybe<ProductBoolExp>;
};

/** Ordering options when selecting data from "product". */
export type ProductOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  product_pricesAggregate?: InputMaybe<ProductPriceAggregateOrderBy>;
  stripeProductId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplace?: InputMaybe<WorkplaceOrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: product */
export type ProductPkColumnsInput = {
  id: Scalars['uuid'];
};

/** columns and relationships of "product_price" */
export type ProductPrice = {
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  price: Scalars['Int'];
  /** An object relationship */
  product: Product;
  productId: Scalars['uuid'];
  stripePriceId: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "product_price" */
export type ProductPriceAggregate = {
  aggregate?: Maybe<ProductPriceAggregateFields>;
  nodes: Array<ProductPrice>;
};

/** aggregate fields of "product_price" */
export type ProductPriceAggregateFields = {
  avg?: Maybe<ProductPriceAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ProductPriceMaxFields>;
  min?: Maybe<ProductPriceMinFields>;
  stddev?: Maybe<ProductPriceStddevFields>;
  stddevPop?: Maybe<ProductPriceStddev_PopFields>;
  stddevSamp?: Maybe<ProductPriceStddev_SampFields>;
  sum?: Maybe<ProductPriceSumFields>;
  varPop?: Maybe<ProductPriceVar_PopFields>;
  varSamp?: Maybe<ProductPriceVar_SampFields>;
  variance?: Maybe<ProductPriceVarianceFields>;
};


/** aggregate fields of "product_price" */
export type ProductPriceAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ProductPriceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "product_price" */
export type ProductPriceAggregateOrderBy = {
  avg?: InputMaybe<Product_Price_Avg_Order_By>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Product_Price_Max_Order_By>;
  min?: InputMaybe<Product_Price_Min_Order_By>;
  stddev?: InputMaybe<Product_Price_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Product_Price_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Product_Price_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Product_Price_Sum_Order_By>;
  var_pop?: InputMaybe<Product_Price_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Product_Price_Var_Samp_Order_By>;
  variance?: InputMaybe<Product_Price_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "product_price" */
export type ProductPriceArrRelInsertInput = {
  data: Array<ProductPriceInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<ProductPriceOnConflict>;
};

/** aggregate avg on columns */
export type ProductPriceAvgFields = {
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "product_price". All fields are combined with a logical 'AND'. */
export type ProductPriceBoolExp = {
  _and?: InputMaybe<Array<ProductPriceBoolExp>>;
  _not?: InputMaybe<ProductPriceBoolExp>;
  _or?: InputMaybe<Array<ProductPriceBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  price?: InputMaybe<IntComparisonExp>;
  product?: InputMaybe<ProductBoolExp>;
  productId?: InputMaybe<UuidComparisonExp>;
  stripePriceId?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "product_price" */
export type ProductPriceConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'product_price_pkey'
  /** unique or primary key constraint on columns "stripe_price_id" */
  | 'product_price_stripe_price_id_key';

/** input type for incrementing numeric columns in table "product_price" */
export type ProductPriceIncInput = {
  price?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "product_price" */
export type ProductPriceInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  product?: InputMaybe<ProductObjRelInsertInput>;
  productId?: InputMaybe<Scalars['uuid']>;
  stripePriceId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type ProductPriceMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['uuid']>;
  stripePriceId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type ProductPriceMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['uuid']>;
  stripePriceId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "product_price" */
export type ProductPriceMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProductPrice>;
};

/** on_conflict condition type for table "product_price" */
export type ProductPriceOnConflict = {
  constraint: ProductPriceConstraint;
  update_columns?: Array<ProductPriceUpdateColumn>;
  where?: InputMaybe<ProductPriceBoolExp>;
};

/** Ordering options when selecting data from "product_price". */
export type ProductPriceOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  product?: InputMaybe<ProductOrderBy>;
  productId?: InputMaybe<OrderBy>;
  stripePriceId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: product_price */
export type ProductPricePkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "product_price" */
export type ProductPriceSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'price'
  /** column name */
  | 'productId'
  /** column name */
  | 'stripePriceId'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "product_price" */
export type ProductPriceSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  productId?: InputMaybe<Scalars['uuid']>;
  stripePriceId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type ProductPriceStddevFields = {
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProductPriceStddev_PopFields = {
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProductPriceStddev_SampFields = {
  price?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "product_price" */
export type ProductPriceStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ProductPriceStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ProductPriceStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  productId?: InputMaybe<Scalars['uuid']>;
  stripePriceId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type ProductPriceSumFields = {
  price?: Maybe<Scalars['Int']>;
};

/** update columns of table "product_price" */
export type ProductPriceUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'price'
  /** column name */
  | 'productId'
  /** column name */
  | 'stripePriceId'
  /** column name */
  | 'updatedAt';

export type ProductPriceUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ProductPriceIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ProductPriceSetInput>;
  where: ProductPriceBoolExp;
};

/** aggregate var_pop on columns */
export type ProductPriceVar_PopFields = {
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProductPriceVar_SampFields = {
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProductPriceVarianceFields = {
  price?: Maybe<Scalars['Float']>;
};

/** select columns of table "product" */
export type ProductSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'description'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'stripeProductId'
  /** column name */
  | 'updatedAt'
  /** column name */
  | 'workplaceId';

/** input type for updating data in table "product" */
export type ProductSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  stripeProductId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "product" */
export type ProductStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ProductStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ProductStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  stripeProductId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "product" */
export type ProductUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'description'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'stripeProductId'
  /** column name */
  | 'updatedAt'
  /** column name */
  | 'workplaceId';

export type ProductUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ProductSetInput>;
  where: ProductBoolExp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user" */
export type User = {
  createdAt: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  workplaceMembers: Array<WorkplaceMember>;
  /** An aggregate relationship */
  workplaceMembersAggregate: WorkplaceMemberAggregate;
  /** An array relationship */
  workplaces: Array<Workplace>;
  /** An aggregate relationship */
  workplacesAggregate: WorkplaceAggregate;
};


/** columns and relationships of "user" */
export type UserWorkplaceMembersArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


/** columns and relationships of "user" */
export type UserWorkplaceMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


/** columns and relationships of "user" */
export type UserWorkplacesArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


/** columns and relationships of "user" */
export type UserWorkplacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};

/** aggregated selection of "user" */
export type UserAggregate = {
  aggregate?: Maybe<UserAggregateFields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type UserAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<UserMaxFields>;
  min?: Maybe<UserMinFields>;
};


/** aggregate fields of "user" */
export type UserAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UserSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type UserBoolExp = {
  _and?: InputMaybe<Array<UserBoolExp>>;
  _not?: InputMaybe<UserBoolExp>;
  _or?: InputMaybe<Array<UserBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  workplaceMembers?: InputMaybe<WorkplaceMemberBoolExp>;
  workplaceMembers_aggregate?: InputMaybe<Workplace_Member_Aggregate_Bool_Exp>;
  workplaces?: InputMaybe<WorkplaceBoolExp>;
  workplaces_aggregate?: InputMaybe<Workplace_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "user" */
export type UserConstraint =
  /** unique or primary key constraint on columns "email" */
  | 'user_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'user_pkey';

/** input type for inserting data into table "user" */
export type UserInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workplaceMembers?: InputMaybe<WorkplaceMemberArrRelInsertInput>;
  workplaces?: InputMaybe<WorkplaceArrRelInsertInput>;
};

/** aggregate max on columns */
export type UserMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type UserMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "user" */
export type UserMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type UserObjRelInsertInput = {
  data: UserInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UserOnConflict>;
};

/** on_conflict condition type for table "user" */
export type UserOnConflict = {
  constraint: UserConstraint;
  update_columns?: Array<UserUpdateColumn>;
  where?: InputMaybe<UserBoolExp>;
};

/** Ordering options when selecting data from "user". */
export type UserOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplaceMembersAggregate?: InputMaybe<WorkplaceMemberAggregateOrderBy>;
  workplacesAggregate?: InputMaybe<WorkplaceAggregateOrderBy>;
};

/** primary key columns input for table: user */
export type UserPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "user" */
export type UserSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "user" */
export type UserSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "user" */
export type UserStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UserStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "user" */
export type UserUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

export type UserUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UserSetInput>;
  where: UserBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "workplace" */
export type Workplace = {
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An object relationship */
  owner: User;
  ownerId: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  workplaceMembers: Array<WorkplaceMember>;
  /** An aggregate relationship */
  workplaceMembersAggregate: WorkplaceMemberAggregate;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplaceMembersArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplaceMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};

/** aggregated selection of "workplace" */
export type WorkplaceAggregate = {
  aggregate?: Maybe<WorkplaceAggregateFields>;
  nodes: Array<Workplace>;
};

/** aggregate fields of "workplace" */
export type WorkplaceAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<WorkplaceMaxFields>;
  min?: Maybe<WorkplaceMinFields>;
};


/** aggregate fields of "workplace" */
export type WorkplaceAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<WorkplaceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "workplace" */
export type WorkplaceAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Workplace_Max_Order_By>;
  min?: InputMaybe<Workplace_Min_Order_By>;
};

/** input type for inserting array relation for remote table "workplace" */
export type WorkplaceArrRelInsertInput = {
  data: Array<WorkplaceInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};

/** Boolean expression to filter rows from the table "workplace". All fields are combined with a logical 'AND'. */
export type WorkplaceBoolExp = {
  _and?: InputMaybe<Array<WorkplaceBoolExp>>;
  _not?: InputMaybe<WorkplaceBoolExp>;
  _or?: InputMaybe<Array<WorkplaceBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<UserBoolExp>;
  ownerId?: InputMaybe<UuidComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  workplaceMembers?: InputMaybe<WorkplaceMemberBoolExp>;
  workplaceMembers_aggregate?: InputMaybe<Workplace_Member_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "workplace" */
export type WorkplaceConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'workplace_pkey';

/** input type for inserting data into table "workplace" */
export type WorkplaceInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<UserObjRelInsertInput>;
  ownerId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  workplaceMembers?: InputMaybe<WorkplaceMemberArrRelInsertInput>;
};

/** aggregate max on columns */
export type WorkplaceMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** columns and relationships of "workplace_member" */
export type WorkplaceMember = {
  /** An object relationship */
  user: User;
  userId: Scalars['uuid'];
  /** An object relationship */
  workplace: Workplace;
  workplaceId: Scalars['uuid'];
};

/** aggregated selection of "workplace_member" */
export type WorkplaceMemberAggregate = {
  aggregate?: Maybe<WorkplaceMemberAggregateFields>;
  nodes: Array<WorkplaceMember>;
};

/** aggregate fields of "workplace_member" */
export type WorkplaceMemberAggregateFields = {
  count: Scalars['Int'];
  max?: Maybe<WorkplaceMemberMaxFields>;
  min?: Maybe<WorkplaceMemberMinFields>;
};


/** aggregate fields of "workplace_member" */
export type WorkplaceMemberAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "workplace_member" */
export type WorkplaceMemberAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Workplace_Member_Max_Order_By>;
  min?: InputMaybe<Workplace_Member_Min_Order_By>;
};

/** input type for inserting array relation for remote table "workplace_member" */
export type WorkplaceMemberArrRelInsertInput = {
  data: Array<WorkplaceMemberInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<WorkplaceMemberOnConflict>;
};

/** Boolean expression to filter rows from the table "workplace_member". All fields are combined with a logical 'AND'. */
export type WorkplaceMemberBoolExp = {
  _and?: InputMaybe<Array<WorkplaceMemberBoolExp>>;
  _not?: InputMaybe<WorkplaceMemberBoolExp>;
  _or?: InputMaybe<Array<WorkplaceMemberBoolExp>>;
  user?: InputMaybe<UserBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
  workplace?: InputMaybe<WorkplaceBoolExp>;
  workplaceId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "workplace_member" */
export type WorkplaceMemberConstraint =
  /** unique or primary key constraint on columns "workplace_id", "user_id" */
  | 'workplace_member_pkey';

/** input type for inserting data into table "workplace_member" */
export type WorkplaceMemberInsertInput = {
  user?: InputMaybe<UserObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']>;
  workplace?: InputMaybe<WorkplaceObjRelInsertInput>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type WorkplaceMemberMaxFields = {
  userId?: Maybe<Scalars['uuid']>;
  workplaceId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type WorkplaceMemberMinFields = {
  userId?: Maybe<Scalars['uuid']>;
  workplaceId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "workplace_member" */
export type WorkplaceMemberMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkplaceMember>;
};

/** on_conflict condition type for table "workplace_member" */
export type WorkplaceMemberOnConflict = {
  constraint: WorkplaceMemberConstraint;
  update_columns?: Array<WorkplaceMemberUpdateColumn>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};

/** Ordering options when selecting data from "workplace_member". */
export type WorkplaceMemberOrderBy = {
  user?: InputMaybe<UserOrderBy>;
  userId?: InputMaybe<OrderBy>;
  workplace?: InputMaybe<WorkplaceOrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: workplace_member */
export type WorkplaceMemberPkColumnsInput = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};

/** select columns of table "workplace_member" */
export type WorkplaceMemberSelectColumn =
  /** column name */
  | 'userId'
  /** column name */
  | 'workplaceId';

/** input type for updating data in table "workplace_member" */
export type WorkplaceMemberSetInput = {
  userId?: InputMaybe<Scalars['uuid']>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "workplace_member" */
export type WorkplaceMemberStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: WorkplaceMemberStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type WorkplaceMemberStreamCursorValueInput = {
  userId?: InputMaybe<Scalars['uuid']>;
  workplaceId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "workplace_member" */
export type WorkplaceMemberUpdateColumn =
  /** column name */
  | 'userId'
  /** column name */
  | 'workplaceId';

export type WorkplaceMemberUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkplaceMemberSetInput>;
  where: WorkplaceMemberBoolExp;
};

/** aggregate min on columns */
export type WorkplaceMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "workplace" */
export type WorkplaceMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Workplace>;
};

/** input type for inserting object relation for remote table "workplace" */
export type WorkplaceObjRelInsertInput = {
  data: WorkplaceInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};

/** on_conflict condition type for table "workplace" */
export type WorkplaceOnConflict = {
  constraint: WorkplaceConstraint;
  update_columns?: Array<WorkplaceUpdateColumn>;
  where?: InputMaybe<WorkplaceBoolExp>;
};

/** Ordering options when selecting data from "workplace". */
export type WorkplaceOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  owner?: InputMaybe<UserOrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplaceMembersAggregate?: InputMaybe<WorkplaceMemberAggregateOrderBy>;
};

/** primary key columns input for table: workplace */
export type WorkplacePkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "workplace" */
export type WorkplaceSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "workplace" */
export type WorkplaceSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "workplace" */
export type WorkplaceStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: WorkplaceStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type WorkplaceStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "workplace" */
export type WorkplaceUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'updatedAt';

export type WorkplaceUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkplaceSetInput>;
  where: WorkplaceBoolExp;
};

export type Lia_Workplace_Aggregate_Bool_Exp = {
  count?: InputMaybe<Lia_Workplace_Aggregate_Bool_Exp_Count>;
};

export type Lia_Workplace_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<LiaWorkplaceBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "lia.workplace" */
export type Lia_Workplace_Max_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
};

export type Lia_Workplace_Member_Aggregate_Bool_Exp = {
  count?: InputMaybe<Lia_Workplace_Member_Aggregate_Bool_Exp_Count>;
};

export type Lia_Workplace_Member_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<LiaWorkplaceMemberBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "lia.workplace_member" */
export type Lia_Workplace_Member_Max_Order_By = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "lia.workplace_member" */
export type Lia_Workplace_Member_Min_Order_By = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "lia.workplace" */
export type Lia_Workplace_Min_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
};

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "lia.public_user" */
  deleteLiaPublicUser?: Maybe<LiaPublicUserMutationResponse>;
  /** delete data from the table: "lia.user" */
  deleteLiaUser?: Maybe<LiaUserMutationResponse>;
  /** delete single row from the table: "lia.user" */
  deleteLiaUserByPk?: Maybe<LiaUser>;
  /** delete data from the table: "lia.workplace" */
  deleteLiaWorkplace?: Maybe<LiaWorkplaceMutationResponse>;
  /** delete single row from the table: "lia.workplace" */
  deleteLiaWorkplaceByPk?: Maybe<LiaWorkplace>;
  /** delete data from the table: "lia.workplace_member" */
  deleteLiaWorkplaceMember?: Maybe<LiaWorkplaceMemberMutationResponse>;
  /** delete single row from the table: "lia.workplace_member" */
  deleteLiaWorkplaceMemberByPk?: Maybe<LiaWorkplaceMember>;
  /** delete data from the table: "product" */
  deleteProduct?: Maybe<ProductMutationResponse>;
  /** delete single row from the table: "product" */
  deleteProductByPk?: Maybe<Product>;
  /** delete data from the table: "product_price" */
  deleteProductPrice?: Maybe<ProductPriceMutationResponse>;
  /** delete single row from the table: "product_price" */
  deleteProductPriceByPk?: Maybe<ProductPrice>;
  /** delete data from the table: "user" */
  deleteUser?: Maybe<UserMutationResponse>;
  /** delete single row from the table: "user" */
  deleteUserByPk?: Maybe<User>;
  /** delete data from the table: "workplace" */
  deleteWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** delete single row from the table: "workplace" */
  deleteWorkplaceByPk?: Maybe<Workplace>;
  /** delete data from the table: "workplace_member" */
  deleteWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** delete single row from the table: "workplace_member" */
  deleteWorkplaceMemberByPk?: Maybe<WorkplaceMember>;
  /** insert data into the table: "lia.public_user" */
  insertLiaPublicUser?: Maybe<LiaPublicUserMutationResponse>;
  /** insert a single row into the table: "lia.public_user" */
  insertLiaPublicUserOne?: Maybe<LiaPublicUser>;
  /** insert data into the table: "lia.user" */
  insertLiaUser?: Maybe<LiaUserMutationResponse>;
  /** insert a single row into the table: "lia.user" */
  insertLiaUserOne?: Maybe<LiaUser>;
  /** insert data into the table: "lia.workplace" */
  insertLiaWorkplace?: Maybe<LiaWorkplaceMutationResponse>;
  /** insert data into the table: "lia.workplace_member" */
  insertLiaWorkplaceMember?: Maybe<LiaWorkplaceMemberMutationResponse>;
  /** insert a single row into the table: "lia.workplace_member" */
  insertLiaWorkplaceMemberOne?: Maybe<LiaWorkplaceMember>;
  /** insert a single row into the table: "lia.workplace" */
  insertLiaWorkplaceOne?: Maybe<LiaWorkplace>;
  /** insert data into the table: "product" */
  insertProduct?: Maybe<ProductMutationResponse>;
  /** insert a single row into the table: "product" */
  insertProductOne?: Maybe<Product>;
  /** insert data into the table: "product_price" */
  insertProductPrice?: Maybe<ProductPriceMutationResponse>;
  /** insert a single row into the table: "product_price" */
  insertProductPriceOne?: Maybe<ProductPrice>;
  /** insert data into the table: "user" */
  insertUser?: Maybe<UserMutationResponse>;
  /** insert a single row into the table: "user" */
  insertUserOne?: Maybe<User>;
  /** insert data into the table: "workplace" */
  insertWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** insert data into the table: "workplace_member" */
  insertWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** insert a single row into the table: "workplace_member" */
  insertWorkplaceMemberOne?: Maybe<WorkplaceMember>;
  /** insert a single row into the table: "workplace" */
  insertWorkplaceOne?: Maybe<Workplace>;
  /** update data of the table: "lia.public_user" */
  updateLiaPublicUser?: Maybe<LiaPublicUserMutationResponse>;
  /** update multiples rows of table: "lia.public_user" */
  updateLiaPublicUserMany?: Maybe<Array<Maybe<LiaPublicUserMutationResponse>>>;
  /** update data of the table: "lia.user" */
  updateLiaUser?: Maybe<LiaUserMutationResponse>;
  /** update single row of the table: "lia.user" */
  updateLiaUserByPk?: Maybe<LiaUser>;
  /** update multiples rows of table: "lia.user" */
  updateLiaUserMany?: Maybe<Array<Maybe<LiaUserMutationResponse>>>;
  /** update data of the table: "lia.workplace" */
  updateLiaWorkplace?: Maybe<LiaWorkplaceMutationResponse>;
  /** update single row of the table: "lia.workplace" */
  updateLiaWorkplaceByPk?: Maybe<LiaWorkplace>;
  /** update multiples rows of table: "lia.workplace" */
  updateLiaWorkplaceMany?: Maybe<Array<Maybe<LiaWorkplaceMutationResponse>>>;
  /** update data of the table: "lia.workplace_member" */
  updateLiaWorkplaceMember?: Maybe<LiaWorkplaceMemberMutationResponse>;
  /** update single row of the table: "lia.workplace_member" */
  updateLiaWorkplaceMemberByPk?: Maybe<LiaWorkplaceMember>;
  /** update multiples rows of table: "lia.workplace_member" */
  updateLiaWorkplaceMemberMany?: Maybe<Array<Maybe<LiaWorkplaceMemberMutationResponse>>>;
  /** update data of the table: "product" */
  updateProduct?: Maybe<ProductMutationResponse>;
  /** update single row of the table: "product" */
  updateProductByPk?: Maybe<Product>;
  /** update multiples rows of table: "product" */
  updateProductMany?: Maybe<Array<Maybe<ProductMutationResponse>>>;
  /** update data of the table: "product_price" */
  updateProductPrice?: Maybe<ProductPriceMutationResponse>;
  /** update single row of the table: "product_price" */
  updateProductPriceByPk?: Maybe<ProductPrice>;
  /** update multiples rows of table: "product_price" */
  updateProductPriceMany?: Maybe<Array<Maybe<ProductPriceMutationResponse>>>;
  /** update data of the table: "user" */
  updateUser?: Maybe<UserMutationResponse>;
  /** update single row of the table: "user" */
  updateUserByPk?: Maybe<User>;
  /** update multiples rows of table: "user" */
  updateUserMany?: Maybe<Array<Maybe<UserMutationResponse>>>;
  /** update data of the table: "workplace" */
  updateWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** update single row of the table: "workplace" */
  updateWorkplaceByPk?: Maybe<Workplace>;
  /** update multiples rows of table: "workplace" */
  updateWorkplaceMany?: Maybe<Array<Maybe<WorkplaceMutationResponse>>>;
  /** update data of the table: "workplace_member" */
  updateWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** update single row of the table: "workplace_member" */
  updateWorkplaceMemberByPk?: Maybe<WorkplaceMember>;
  /** update multiples rows of table: "workplace_member" */
  updateWorkplaceMemberMany?: Maybe<Array<Maybe<WorkplaceMemberMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteLiaPublicUserArgs = {
  where: LiaPublicUserBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteLiaUserArgs = {
  where: LiaUserBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteLiaUserByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteLiaWorkplaceArgs = {
  where: LiaWorkplaceBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteLiaWorkplaceByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteLiaWorkplaceMemberArgs = {
  where: LiaWorkplaceMemberBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteLiaWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProductArgs = {
  where: ProductBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProductByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProductPriceArgs = {
  where: ProductPriceBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProductPriceByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUserArgs = {
  where: UserBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUserByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceArgs = {
  where: WorkplaceBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceMemberArgs = {
  where: WorkplaceMemberBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertLiaPublicUserArgs = {
  objects: Array<LiaPublicUserInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertLiaPublicUserOneArgs = {
  object: LiaPublicUserInsertInput;
};


/** mutation root */
export type Mutation_RootInsertLiaUserArgs = {
  objects: Array<LiaUserInsertInput>;
  onConflict?: InputMaybe<LiaUserOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertLiaUserOneArgs = {
  object: LiaUserInsertInput;
  onConflict?: InputMaybe<LiaUserOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertLiaWorkplaceArgs = {
  objects: Array<LiaWorkplaceInsertInput>;
  onConflict?: InputMaybe<LiaWorkplaceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertLiaWorkplaceMemberArgs = {
  objects: Array<LiaWorkplaceMemberInsertInput>;
  onConflict?: InputMaybe<LiaWorkplaceMemberOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertLiaWorkplaceMemberOneArgs = {
  object: LiaWorkplaceMemberInsertInput;
  onConflict?: InputMaybe<LiaWorkplaceMemberOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertLiaWorkplaceOneArgs = {
  object: LiaWorkplaceInsertInput;
  onConflict?: InputMaybe<LiaWorkplaceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProductArgs = {
  objects: Array<ProductInsertInput>;
  onConflict?: InputMaybe<ProductOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProductOneArgs = {
  object: ProductInsertInput;
  onConflict?: InputMaybe<ProductOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProductPriceArgs = {
  objects: Array<ProductPriceInsertInput>;
  onConflict?: InputMaybe<ProductPriceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProductPriceOneArgs = {
  object: ProductPriceInsertInput;
  onConflict?: InputMaybe<ProductPriceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserArgs = {
  objects: Array<UserInsertInput>;
  onConflict?: InputMaybe<UserOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserOneArgs = {
  object: UserInsertInput;
  onConflict?: InputMaybe<UserOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceArgs = {
  objects: Array<WorkplaceInsertInput>;
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceMemberArgs = {
  objects: Array<WorkplaceMemberInsertInput>;
  onConflict?: InputMaybe<WorkplaceMemberOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceMemberOneArgs = {
  object: WorkplaceMemberInsertInput;
  onConflict?: InputMaybe<WorkplaceMemberOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceOneArgs = {
  object: WorkplaceInsertInput;
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateLiaPublicUserArgs = {
  _set?: InputMaybe<LiaPublicUserSetInput>;
  where: LiaPublicUserBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateLiaPublicUserManyArgs = {
  updates: Array<LiaPublicUserUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateLiaUserArgs = {
  _set?: InputMaybe<LiaUserSetInput>;
  where: LiaUserBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateLiaUserByPkArgs = {
  _set?: InputMaybe<LiaUserSetInput>;
  pk_columns: LiaUserPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateLiaUserManyArgs = {
  updates: Array<LiaUserUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateLiaWorkplaceArgs = {
  _set?: InputMaybe<LiaWorkplaceSetInput>;
  where: LiaWorkplaceBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateLiaWorkplaceByPkArgs = {
  _set?: InputMaybe<LiaWorkplaceSetInput>;
  pk_columns: LiaWorkplacePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateLiaWorkplaceManyArgs = {
  updates: Array<LiaWorkplaceUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateLiaWorkplaceMemberArgs = {
  _set?: InputMaybe<LiaWorkplaceMemberSetInput>;
  where: LiaWorkplaceMemberBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateLiaWorkplaceMemberByPkArgs = {
  _set?: InputMaybe<LiaWorkplaceMemberSetInput>;
  pk_columns: LiaWorkplaceMemberPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateLiaWorkplaceMemberManyArgs = {
  updates: Array<LiaWorkplaceMemberUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProductArgs = {
  _set?: InputMaybe<ProductSetInput>;
  where: ProductBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProductByPkArgs = {
  _set?: InputMaybe<ProductSetInput>;
  pk_columns: ProductPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProductManyArgs = {
  updates: Array<ProductUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProductPriceArgs = {
  _inc?: InputMaybe<ProductPriceIncInput>;
  _set?: InputMaybe<ProductPriceSetInput>;
  where: ProductPriceBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProductPriceByPkArgs = {
  _inc?: InputMaybe<ProductPriceIncInput>;
  _set?: InputMaybe<ProductPriceSetInput>;
  pk_columns: ProductPricePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProductPriceManyArgs = {
  updates: Array<ProductPriceUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _set?: InputMaybe<UserSetInput>;
  where: UserBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUserByPkArgs = {
  _set?: InputMaybe<UserSetInput>;
  pk_columns: UserPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUserManyArgs = {
  updates: Array<UserUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceArgs = {
  _set?: InputMaybe<WorkplaceSetInput>;
  where: WorkplaceBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceByPkArgs = {
  _set?: InputMaybe<WorkplaceSetInput>;
  pk_columns: WorkplacePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceManyArgs = {
  updates: Array<WorkplaceUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceMemberArgs = {
  _set?: InputMaybe<WorkplaceMemberSetInput>;
  where: WorkplaceMemberBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceMemberByPkArgs = {
  _set?: InputMaybe<WorkplaceMemberSetInput>;
  pk_columns: WorkplaceMemberPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceMemberManyArgs = {
  updates: Array<WorkplaceMemberUpdates>;
};

export type Product_Price_Aggregate_Bool_Exp = {
  count?: InputMaybe<Product_Price_Aggregate_Bool_Exp_Count>;
};

export type Product_Price_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ProductPriceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<ProductPriceBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "product_price" */
export type Product_Price_Avg_Order_By = {
  price?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "product_price" */
export type Product_Price_Max_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  productId?: InputMaybe<OrderBy>;
  stripePriceId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "product_price" */
export type Product_Price_Min_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  productId?: InputMaybe<OrderBy>;
  stripePriceId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "product_price" */
export type Product_Price_Stddev_Order_By = {
  price?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "product_price" */
export type Product_Price_Stddev_Pop_Order_By = {
  price?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "product_price" */
export type Product_Price_Stddev_Samp_Order_By = {
  price?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "product_price" */
export type Product_Price_Sum_Order_By = {
  price?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "product_price" */
export type Product_Price_Var_Pop_Order_By = {
  price?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "product_price" */
export type Product_Price_Var_Samp_Order_By = {
  price?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "product_price" */
export type Product_Price_Variance_Order_By = {
  price?: InputMaybe<OrderBy>;
};

export type Query_Root = {
  /** fetch data from the table: "lia.public_user" */
  liaPublicUser: Array<LiaPublicUser>;
  /** fetch aggregated fields from the table: "lia.public_user" */
  liaPublicUserAggregate: LiaPublicUserAggregate;
  /** fetch data from the table: "lia.user" */
  liaUser: Array<LiaUser>;
  /** fetch aggregated fields from the table: "lia.user" */
  liaUserAggregate: LiaUserAggregate;
  /** fetch data from the table: "lia.user" using primary key columns */
  liaUserByPk?: Maybe<LiaUser>;
  /** fetch data from the table: "lia.workplace" */
  liaWorkplace: Array<LiaWorkplace>;
  /** fetch aggregated fields from the table: "lia.workplace" */
  liaWorkplaceAggregate: LiaWorkplaceAggregate;
  /** fetch data from the table: "lia.workplace" using primary key columns */
  liaWorkplaceByPk?: Maybe<LiaWorkplace>;
  /** fetch data from the table: "lia.workplace_member" */
  liaWorkplaceMember: Array<LiaWorkplaceMember>;
  /** fetch aggregated fields from the table: "lia.workplace_member" */
  liaWorkplaceMemberAggregate: LiaWorkplaceMemberAggregate;
  /** fetch data from the table: "lia.workplace_member" using primary key columns */
  liaWorkplaceMemberByPk?: Maybe<LiaWorkplaceMember>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  productAggregate: ProductAggregate;
  /** fetch data from the table: "product" using primary key columns */
  productByPk?: Maybe<Product>;
  /** fetch data from the table: "product_price" */
  productPrice: Array<ProductPrice>;
  /** fetch aggregated fields from the table: "product_price" */
  productPriceAggregate: ProductPriceAggregate;
  /** fetch data from the table: "product_price" using primary key columns */
  productPriceByPk?: Maybe<ProductPrice>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  userAggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table: "workplace" */
  workplace: Array<Workplace>;
  /** fetch aggregated fields from the table: "workplace" */
  workplaceAggregate: WorkplaceAggregate;
  /** fetch data from the table: "workplace" using primary key columns */
  workplaceByPk?: Maybe<Workplace>;
  /** fetch data from the table: "workplace_member" */
  workplaceMember: Array<WorkplaceMember>;
  /** fetch aggregated fields from the table: "workplace_member" */
  workplaceMemberAggregate: WorkplaceMemberAggregate;
  /** fetch data from the table: "workplace_member" using primary key columns */
  workplaceMemberByPk?: Maybe<WorkplaceMember>;
};


export type Query_RootLiaPublicUserArgs = {
  distinctOn?: InputMaybe<Array<LiaPublicUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaPublicUserOrderBy>>;
  where?: InputMaybe<LiaPublicUserBoolExp>;
};


export type Query_RootLiaPublicUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaPublicUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaPublicUserOrderBy>>;
  where?: InputMaybe<LiaPublicUserBoolExp>;
};


export type Query_RootLiaUserArgs = {
  distinctOn?: InputMaybe<Array<LiaUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaUserOrderBy>>;
  where?: InputMaybe<LiaUserBoolExp>;
};


export type Query_RootLiaUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaUserOrderBy>>;
  where?: InputMaybe<LiaUserBoolExp>;
};


export type Query_RootLiaUserByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLiaWorkplaceArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceOrderBy>>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};


export type Query_RootLiaWorkplaceAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceOrderBy>>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};


export type Query_RootLiaWorkplaceByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLiaWorkplaceMemberArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


export type Query_RootLiaWorkplaceMemberAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


export type Query_RootLiaWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};


export type Query_RootProductArgs = {
  distinctOn?: InputMaybe<Array<ProductSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductOrderBy>>;
  where?: InputMaybe<ProductBoolExp>;
};


export type Query_RootProductAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProductSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductOrderBy>>;
  where?: InputMaybe<ProductBoolExp>;
};


export type Query_RootProductByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProductPriceArgs = {
  distinctOn?: InputMaybe<Array<ProductPriceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductPriceOrderBy>>;
  where?: InputMaybe<ProductPriceBoolExp>;
};


export type Query_RootProductPriceAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProductPriceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductPriceOrderBy>>;
  where?: InputMaybe<ProductPriceBoolExp>;
};


export type Query_RootProductPriceByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Query_RootUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Query_RootUserByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWorkplaceArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Query_RootWorkplaceAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Query_RootWorkplaceByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWorkplaceMemberArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Query_RootWorkplaceMemberAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Query_RootWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};

export type Subscription_Root = {
  /** fetch data from the table: "lia.public_user" */
  liaPublicUser: Array<LiaPublicUser>;
  /** fetch aggregated fields from the table: "lia.public_user" */
  liaPublicUserAggregate: LiaPublicUserAggregate;
  /** fetch data from the table in a streaming manner: "lia.public_user" */
  liaPublicUserStream: Array<LiaPublicUser>;
  /** fetch data from the table: "lia.user" */
  liaUser: Array<LiaUser>;
  /** fetch aggregated fields from the table: "lia.user" */
  liaUserAggregate: LiaUserAggregate;
  /** fetch data from the table: "lia.user" using primary key columns */
  liaUserByPk?: Maybe<LiaUser>;
  /** fetch data from the table in a streaming manner: "lia.user" */
  liaUserStream: Array<LiaUser>;
  /** fetch data from the table: "lia.workplace" */
  liaWorkplace: Array<LiaWorkplace>;
  /** fetch aggregated fields from the table: "lia.workplace" */
  liaWorkplaceAggregate: LiaWorkplaceAggregate;
  /** fetch data from the table: "lia.workplace" using primary key columns */
  liaWorkplaceByPk?: Maybe<LiaWorkplace>;
  /** fetch data from the table: "lia.workplace_member" */
  liaWorkplaceMember: Array<LiaWorkplaceMember>;
  /** fetch aggregated fields from the table: "lia.workplace_member" */
  liaWorkplaceMemberAggregate: LiaWorkplaceMemberAggregate;
  /** fetch data from the table: "lia.workplace_member" using primary key columns */
  liaWorkplaceMemberByPk?: Maybe<LiaWorkplaceMember>;
  /** fetch data from the table in a streaming manner: "lia.workplace_member" */
  liaWorkplaceMemberStream: Array<LiaWorkplaceMember>;
  /** fetch data from the table in a streaming manner: "lia.workplace" */
  liaWorkplaceStream: Array<LiaWorkplace>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  productAggregate: ProductAggregate;
  /** fetch data from the table: "product" using primary key columns */
  productByPk?: Maybe<Product>;
  /** fetch data from the table: "product_price" */
  productPrice: Array<ProductPrice>;
  /** fetch aggregated fields from the table: "product_price" */
  productPriceAggregate: ProductPriceAggregate;
  /** fetch data from the table: "product_price" using primary key columns */
  productPriceByPk?: Maybe<ProductPrice>;
  /** fetch data from the table in a streaming manner: "product_price" */
  productPriceStream: Array<ProductPrice>;
  /** fetch data from the table in a streaming manner: "product" */
  productStream: Array<Product>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  userAggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "user" */
  userStream: Array<User>;
  /** fetch data from the table: "workplace" */
  workplace: Array<Workplace>;
  /** fetch aggregated fields from the table: "workplace" */
  workplaceAggregate: WorkplaceAggregate;
  /** fetch data from the table: "workplace" using primary key columns */
  workplaceByPk?: Maybe<Workplace>;
  /** fetch data from the table: "workplace_member" */
  workplaceMember: Array<WorkplaceMember>;
  /** fetch aggregated fields from the table: "workplace_member" */
  workplaceMemberAggregate: WorkplaceMemberAggregate;
  /** fetch data from the table: "workplace_member" using primary key columns */
  workplaceMemberByPk?: Maybe<WorkplaceMember>;
  /** fetch data from the table in a streaming manner: "workplace_member" */
  workplaceMemberStream: Array<WorkplaceMember>;
  /** fetch data from the table in a streaming manner: "workplace" */
  workplaceStream: Array<Workplace>;
};


export type Subscription_RootLiaPublicUserArgs = {
  distinctOn?: InputMaybe<Array<LiaPublicUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaPublicUserOrderBy>>;
  where?: InputMaybe<LiaPublicUserBoolExp>;
};


export type Subscription_RootLiaPublicUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaPublicUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaPublicUserOrderBy>>;
  where?: InputMaybe<LiaPublicUserBoolExp>;
};


export type Subscription_RootLiaPublicUserStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<LiaPublicUserStreamCursorInput>>;
  where?: InputMaybe<LiaPublicUserBoolExp>;
};


export type Subscription_RootLiaUserArgs = {
  distinctOn?: InputMaybe<Array<LiaUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaUserOrderBy>>;
  where?: InputMaybe<LiaUserBoolExp>;
};


export type Subscription_RootLiaUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaUserOrderBy>>;
  where?: InputMaybe<LiaUserBoolExp>;
};


export type Subscription_RootLiaUserByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLiaUserStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<LiaUserStreamCursorInput>>;
  where?: InputMaybe<LiaUserBoolExp>;
};


export type Subscription_RootLiaWorkplaceArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceOrderBy>>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};


export type Subscription_RootLiaWorkplaceAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceOrderBy>>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};


export type Subscription_RootLiaWorkplaceByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLiaWorkplaceMemberArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


export type Subscription_RootLiaWorkplaceMemberAggregateArgs = {
  distinctOn?: InputMaybe<Array<LiaWorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LiaWorkplaceMemberOrderBy>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


export type Subscription_RootLiaWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};


export type Subscription_RootLiaWorkplaceMemberStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<LiaWorkplaceMemberStreamCursorInput>>;
  where?: InputMaybe<LiaWorkplaceMemberBoolExp>;
};


export type Subscription_RootLiaWorkplaceStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<LiaWorkplaceStreamCursorInput>>;
  where?: InputMaybe<LiaWorkplaceBoolExp>;
};


export type Subscription_RootProductArgs = {
  distinctOn?: InputMaybe<Array<ProductSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductOrderBy>>;
  where?: InputMaybe<ProductBoolExp>;
};


export type Subscription_RootProductAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProductSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductOrderBy>>;
  where?: InputMaybe<ProductBoolExp>;
};


export type Subscription_RootProductByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProductPriceArgs = {
  distinctOn?: InputMaybe<Array<ProductPriceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductPriceOrderBy>>;
  where?: InputMaybe<ProductPriceBoolExp>;
};


export type Subscription_RootProductPriceAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProductPriceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductPriceOrderBy>>;
  where?: InputMaybe<ProductPriceBoolExp>;
};


export type Subscription_RootProductPriceByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProductPriceStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<ProductPriceStreamCursorInput>>;
  where?: InputMaybe<ProductPriceBoolExp>;
};


export type Subscription_RootProductStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<ProductStreamCursorInput>>;
  where?: InputMaybe<ProductBoolExp>;
};


export type Subscription_RootUserArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Subscription_RootUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Subscription_RootUserByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<UserStreamCursorInput>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Subscription_RootWorkplaceArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Subscription_RootWorkplaceAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Subscription_RootWorkplaceByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWorkplaceMemberArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Subscription_RootWorkplaceMemberAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Subscription_RootWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
};


export type Subscription_RootWorkplaceMemberStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<WorkplaceMemberStreamCursorInput>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Subscription_RootWorkplaceStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<WorkplaceStreamCursorInput>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};

export type Workplace_Aggregate_Bool_Exp = {
  count?: InputMaybe<Workplace_Aggregate_Bool_Exp_Count>;
};

export type Workplace_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<WorkplaceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<WorkplaceBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "workplace" */
export type Workplace_Max_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type Workplace_Member_Aggregate_Bool_Exp = {
  count?: InputMaybe<Workplace_Member_Aggregate_Bool_Exp_Count>;
};

export type Workplace_Member_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<WorkplaceMemberBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "workplace_member" */
export type Workplace_Member_Max_Order_By = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "workplace_member" */
export type Workplace_Member_Min_Order_By = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "workplace" */
export type Workplace_Min_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type GetUserByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type GetUserByEmailQuery = { liaUser: Array<{ id: string, email: string, name: string }> };

export type AddUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
}>;


export type AddUserMutation = { insertLiaUser?: { returning: Array<{ id: string, email: string, name: string }> } | null };

export type UserByIdQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type UserByIdQuery = { user?: { createdAt: string, email: string, id: string, name: string, updatedAt: string, image?: string | null } | null };

export type CreateWorkplaceMutationVariables = Exact<{
  ownerId?: InputMaybe<Scalars['uuid']>;
  token?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type CreateWorkplaceMutation = { insertLiaWorkplace?: { returning: Array<{ id: string, title?: string | null, url: string, ownerId: string, updatedAt: string }> } | null };

export type GetWorkplaceByUrlQueryVariables = Exact<{
  url?: InputMaybe<Scalars['String']>;
}>;


export type GetWorkplaceByUrlQuery = { liaWorkplace: Array<{ title?: string | null, token: string, url: string, ownerId: string, id: string, updatedAt: string }> };

export type GetWorkplaceByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type GetWorkplaceByIdQuery = { liaWorkplace: Array<{ title?: string | null, token: string, url: string, ownerId: string }> };

export type GetWorkplacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkplacesQuery = { liaWorkplace: Array<{ title?: string | null, token: string, url: string, ownerId: string, id: string, updatedAt: string, createdAt: string }> };

export type DeleteWorkplaceMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type DeleteWorkplaceMutation = { deleteLiaWorkplace?: { affected_rows: number, returning: Array<{ id: string }> } | null };

export type InviteUserMutationVariables = Exact<{
  userId: Scalars['uuid'];
  workplaceId: Scalars['uuid'];
}>;


export type InviteUserMutation = { insertLiaWorkplaceMember?: { affected_rows: number } | null };

export type RemoveWorkplaceMembersMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']>;
}>;


export type RemoveWorkplaceMembersMutation = { deleteLiaWorkplaceMember?: { affected_rows: number } | null };

export type GetPublicUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicUsersQuery = { liaPublicUser: Array<{ id?: string | null, name?: string | null, email?: string | null }> };


export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liaUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertLiaUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"user_email_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"name"},{"kind":"EnumValue","value":"image"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const UserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"liaUserByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<UserByIdQuery, UserByIdQueryVariables>;
export const CreateWorkplaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkplace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertLiaWorkplace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"workplace_url_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"EnumValue","value":"title"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWorkplaceMutation, CreateWorkplaceMutationVariables>;
export const GetWorkplaceByUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkplaceByURL"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liaWorkplace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"url"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetWorkplaceByUrlQuery, GetWorkplaceByUrlQueryVariables>;
export const GetWorkplaceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkplaceById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liaWorkplace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}}]}}]}}]} as unknown as DocumentNode<GetWorkplaceByIdQuery, GetWorkplaceByIdQueryVariables>;
export const GetWorkplacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkplaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liaWorkplace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetWorkplacesQuery, GetWorkplacesQueryVariables>;
export const DeleteWorkplaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkplace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLiaWorkplace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}},{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteWorkplaceMutation, DeleteWorkplaceMutationVariables>;
export const InviteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertLiaWorkplaceMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<InviteUserMutation, InviteUserMutationVariables>;
export const RemoveWorkplaceMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveWorkplaceMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLiaWorkplaceMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<RemoveWorkplaceMembersMutation, RemoveWorkplaceMembersMutationVariables>;
export const GetPublicUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liaPublicUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetPublicUsersQuery, GetPublicUsersQueryVariables>;