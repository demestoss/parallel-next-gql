import { IssuesQuery } from "@/gql/issuesQuery";
import type { Issue } from "@/gql/types";
import { getClient } from "@/utils/graphqlClient";
import { unstable_cache } from "next/cache";
import type { Client } from "urql";
import IssueItem from "../_components/IssueItem";

type SearchParams = { [key: string]: string | string[] | undefined };

const getAllIssues = unstable_cache(
	async (client: Client, searchParams: SearchParams) => {
		const res = await client
			.query(IssuesQuery, {
				input: {
					statuses: searchParams.statuses,
					sortedBy: searchParams.sortedBy,
					search: searchParams.search,
				},
			})
			.toPromise();
		return res.data.issues as Issue[];
	},
	[],
	{
		tags: ["issues"],
	},
);

export default async function IssuesPage({
	searchParams,
}: { searchParams: Promise<SearchParams> }) {
	const client = await getClient();
	const query = await searchParams;
	const issues = await getAllIssues(client, query);

	return (
		<div>
			{issues.map((issue) => (
				<div key={issue.id}>
					<IssueItem issue={issue} />
				</div>
			))}
		</div>
	);
}
