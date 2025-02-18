import { issues } from "@/db/schema";
import type { QueryResolvers } from "@/gql/types";
import { and, asc, desc, eq, or, sql } from "drizzle-orm";
import { authGuard } from "./auth";

const queries: QueryResolvers = {
	me: (_, __, ctx) => {
		return ctx.user;
	},
	issues: async (_, { input }, ctx) => {
		authGuard(ctx);

		const andFilters = [eq(issues.userId, ctx.user.id)];
		if (input?.statuses?.length) {
			const statusFilters = input.statuses.map((status) =>
				eq(issues.status, status),
			);

			andFilters.push(or(...statusFilters));
		}
		if (input?.search) {
			andFilters.push(
				sql`lower(${issues.name}) like lower(${`%${input.search}%`})`,
			);
		}

		const orderByFilters = [
			asc(sql`case ${issues.status}
        when "backlog" then 1
        when "inprogress" then 2
        when "done" then 3
      end`),
			desc(issues.createdAt),
		];
		if (input?.sortedBy === "CREATED_AT") {
			orderByFilters.reverse();
		}

		const data = await ctx.db.query.issues.findMany({
			where: and(...andFilters),
			orderBy: orderByFilters,
		});

		return data;
	},
};

export default queries;
