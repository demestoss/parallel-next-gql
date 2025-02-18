import type { Database } from "@/db/db";

export type GQLContextUser = {
	createdAt: string;
	email: string;
	id: string;
};

export type GQLContext = {
	user: GQLContextUser | null;
	db: Database;
};
