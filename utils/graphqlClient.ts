import "server-only";
import { getToken } from "@/utils/token";
import { cache } from "react";
import { cacheExchange, createClient, fetchExchange } from "urql";

const url = process.env.APP_URL ?? "http://localhost:3001/api/graphql";

export const graphqlClient = async (
	query: string,
	variables?: Record<string, any>,
) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ query, variables }),
	});
	if (!res.ok) {
		throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
	}

	const json = await res.json();
	return json;
};

export const makeClient = async () => {
	const token = await getToken();
	return createClient({
		url,
		exchanges: [cacheExchange, fetchExchange],
		fetchOptions: () => {
			return token
				? {
						headers: { Authorization: `Bearer ${token}` },
					}
				: {};
		},
	});
};

export const getClient = cache(makeClient);
