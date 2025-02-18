"use server";

import { CreateIssueMutation } from "@/gql/createIssueMutation";
import { DeleteIssueMutation } from "@/gql/deleteIssueMutation";
import { EditIssueMutation } from "@/gql/editIssueMutation";
import type { IssueStatusType } from "@/gql/types.mapper";
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

export const setIssueStatus = async (id: string, status: IssueStatusType) => {
	const client = await getClient();
	const result = await client
		.mutation(EditIssueMutation, { input: { id, status } })
		.toPromise();

	if (result.error) {
		return { message: "Failed to update issue" };
	}

	revalidateTag("issues");
};

export const deleteIssue = async (id: string) => {
	const client = await getClient();
	const result = await client.mutation(DeleteIssueMutation, { id }).toPromise();

	if (result.error) {
		return { message: "Failed to delete issue" };
	}

	revalidateTag("issues");
};
