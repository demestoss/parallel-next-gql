import type { GQLContext, GQLContextUser } from "@/types";
import { GraphQLError } from "graphql/error";

type AuthenticatedGQLContext = Omit<GQLContext, "user"> & {
	user: GQLContextUser;
};

export function authGuard(
	ctx: GQLContext,
): asserts ctx is AuthenticatedGQLContext {
	if (!ctx.user) {
		throw new GraphQLError("UNAUTHORIZED", {
			extensions: { code: 401 },
		});
	}
}
