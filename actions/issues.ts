"use server";

import { CreateIssueMutation } from "@/gql/createIssueMutation";
import { EditIssueMutation } from "@/gql/editIssueMutation";
import { getClient } from "@/utils/graphqlClient";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const issueSchema = z.object({
	name: z.string().min(2),
	content: z.string().optional(),
});

export const createIssue = async (_: any, formData: FormData) => {
	const res = issueSchema.safeParse(Object.fromEntries(formData.entries()));
	if (!res.success) {
		return { message: res.error.message };
	}

	const client = await getClient();
	const result = await client
		.mutation(CreateIssueMutation, { input: res.data })
		.toPromise();

	if (result.error) {
		return { message: "Failed to create issue" };
	}

	revalidateTag("issues");
	redirect("/");
};

export type IssueStatus = "BACKLOG" | "INPROGRESS" | "DONE";

export const setIssueStatus = async (id: string, status: IssueStatus) => {
	const client = await getClient();
	const result = await client
		.mutation(EditIssueMutation, { input: { id, status } })
		.toPromise();

	if (result.error) {
		return { message: "Failed to update issue" };
	}

	revalidateTag("issues");
};
