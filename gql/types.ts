import { DBIssueStatus as IssueStatus } from './types.mapper';
import { GraphQLResolveInfo } from 'graphql';
import { DBIssueStatus } from './types.mapper';
import { GQLContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type CreateIssueInput = {
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status?: InputMaybe<IssueStatus>;
};

export type EditIssueInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<IssueStatus>;
};

export type Issue = {
  __typename?: 'Issue';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projectId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<IssueStatus>;
  user: User;
  userId: Scalars['ID']['output'];
};

export enum IssueSort {
  CreatedAt = 'CREATED_AT',
  Status = 'STATUS'
}

export { IssueStatus };

export type IssuesFilterInput = {
  search?: InputMaybe<Scalars['String']['input']>;
  sortedBy?: InputMaybe<IssueSort>;
  statuses?: InputMaybe<Array<InputMaybe<IssueStatus>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createIssue?: Maybe<Issue>;
  createUser?: Maybe<AuthUser>;
  deleteIssue: Scalars['ID']['output'];
  editIssue?: Maybe<Issue>;
  signin?: Maybe<AuthUser>;
};


export type MutationCreateIssueArgs = {
  input: CreateIssueInput;
};


export type MutationCreateUserArgs = {
  input: AuthInput;
};


export type MutationDeleteIssueArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditIssueArgs = {
  input: EditIssueInput;
};


export type MutationSigninArgs = {
  input: AuthInput;
};

export type Query = {
  __typename?: 'Query';
  issues: Array<Maybe<Issue>>;
  me?: Maybe<UserProfile>;
};


export type QueryIssuesArgs = {
  input?: InputMaybe<IssuesFilterInput>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  issues: Array<Maybe<Issue>>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthInput: AuthInput;
  AuthUser: ResolverTypeWrapper<AuthUser>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateIssueInput: CreateIssueInput;
  EditIssueInput: EditIssueInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Issue: ResolverTypeWrapper<Omit<Issue, 'status' | 'user'> & { status?: Maybe<ResolversTypes['IssueStatus']>, user: ResolversTypes['User'] }>;
  IssueSort: IssueSort;
  IssueStatus: ResolverTypeWrapper<DBIssueStatus>;
  IssuesFilterInput: IssuesFilterInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<Omit<User, 'issues'> & { issues: Array<Maybe<ResolversTypes['Issue']>> }>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthInput: AuthInput;
  AuthUser: AuthUser;
  Boolean: Scalars['Boolean']['output'];
  CreateIssueInput: CreateIssueInput;
  EditIssueInput: EditIssueInput;
  ID: Scalars['ID']['output'];
  Issue: Omit<Issue, 'user'> & { user: ResolversParentTypes['User'] };
  IssuesFilterInput: IssuesFilterInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: Omit<User, 'issues'> & { issues: Array<Maybe<ResolversParentTypes['Issue']>> };
  UserProfile: UserProfile;
};

export type AuthUserResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['AuthUser'] = ResolversParentTypes['AuthUser']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Issue'] = ResolversParentTypes['Issue']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['IssueStatus']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueStatusResolvers = EnumResolverSignature<{ BACKLOG?: any, DONE?: any, INPROGRESS?: any, TODO?: any }, ResolversTypes['IssueStatus']>;

export type MutationResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createIssue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<MutationCreateIssueArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteIssue?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteIssueArgs, 'id'>>;
  editIssue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<MutationEditIssueArgs, 'input'>>;
  signin?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<MutationSigninArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  issues?: Resolver<Array<Maybe<ResolversTypes['Issue']>>, ParentType, ContextType, Partial<QueryIssuesArgs>>;
  me?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issues?: Resolver<Array<Maybe<ResolversTypes['Issue']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = GQLContext, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GQLContext> = {
  AuthUser?: AuthUserResolvers<ContextType>;
  Issue?: IssueResolvers<ContextType>;
  IssueStatus?: IssueStatusResolvers;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
};

