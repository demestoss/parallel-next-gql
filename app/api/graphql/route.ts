import { getUserFromToken } from "@/utils/auth";
import { tokenKey } from "@/utils/token";
import { ApolloServer } from "@apollo/server";
import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";
import resolvers from "./resolvers";
import typeDefs from "./schema";

let plugins = [];
if (process.env.NODE_ENV === "production") {
	plugins = [
		ApolloServerPluginLandingPageProductionDefault({
			embed: true,
			graphRef: "myGraph@prod",
		}),
	];
} else {
	plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];
}

const server = new ApolloServer({
	resolvers,
	typeDefs,
	plugins,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => {
		const authHeader = req.headers.get("Authorization");
		const token = authHeader?.replace("Bearer ", "").trim();
		const user = await getUserFromToken(token);
		return {
			req,
			user,
		};
	},
});

export async function GET(request: NextRequest) {
	return handler(request);
}

export async function POST(request: NextRequest) {
	return handler(request);
}
