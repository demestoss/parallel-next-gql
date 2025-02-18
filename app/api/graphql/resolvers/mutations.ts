import { issues } from "@/db/schema";
import type { MutationResolvers } from "@/gql/types";
import { signin, signup } from "@/utils/auth";
import { dnull } from "dnull";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql/error";
import { authGuard } from "./auth";

const mutations: MutationResolvers = {
	signin: async (_, { input }) => {
		const data = await signin(input);

		if (!data || !data.token || !data.user) {
			throw new GraphQLError("UNAUTHORIZED", {
				extensions: { code: 401 },
			});
		}

		return { ...data.user, token: data.token };
	},
	createUser: async (_, { input }) => {
		const data = await signup(input);

		if (!data || !data.token || !data.user) {
			throw new GraphQLError("UNAUTHORIZED", {
				extensions: { code: 401 },
			});
		}

		return { ...data.user, token: data.token };
	},
	createIssue: async (_, { input }, ctx) => {
		authGuard(ctx);

		const data = await ctx.db
			.insert(issues)
			.values(
				dnull({
					...input,
					userId: ctx.user.id,
				}),
			)
			.returning();

		return data[0];
	},
	editIssue: async (_, { input }, ctx) => {
		authGuard(ctx);
		const { id, ...updates } = input;
		const issue = await ctx.db
			.update(issues)
			.set(dnull(updates))
			.where(eq(issues.id, id))
			.returning();
		return issue[0];
	},
	deleteIssue: async (_, { id }, ctx) => {
		authGuard(ctx);
		await ctx.db.delete(issues).where(eq(issues.id, id));
		return id;
	},
};

export default mutations;
