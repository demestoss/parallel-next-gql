import { issues, users } from "@/db/schema";
import type { Resolvers } from "@/gql/types";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql/error";
import { authGuard } from "./resolvers/auth";
import mutations from "./resolvers/mutations";
import queries from "./resolvers/queries";

export const resolvers: Resolvers = {
	IssueStatus: {
		BACKLOG: "backlog",
		TODO: "todo",
		INPROGRESS: "inprogress",
		DONE: "done",
	},
	Issue: {
		user: async (issue, _, ctx) => {
			authGuard(ctx);
			const user = await ctx.db.query.users.findFirst({
				where: eq(users.id, issue.userId),
			});
			if (!user) {
				throw new GraphQLError("USER NOT FOUND", {
					extensions: { code: 404 },
				});
			}
			return user;
		},
	},
	User: {
		issues: (user, _, ctx) => {
			authGuard(ctx);
			return ctx.db.query.issues.findMany({
				where: eq(issues.userId, user.id),
			});
		},
	},
	Query: queries,
	Mutation: mutations,
};
