"use server";
import { SigninMutation } from "@/gql/signinMutation";
import { SignupMutation } from "@/gql/signupMutation";
import { getClient, graphqlClient } from "@/utils/graphqlClient";
import { removeToken, setToken } from "@/utils/token";
import { redirect } from "next/navigation";
import { z } from "zod";

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(2),
});

export async function registerUser(prevState: any, formData: FormData) {
	const res = authSchema.safeParse(Object.fromEntries(formData.entries()));

	if (!res.success) {
		return { message: res.error.message };
	}

	const client = await getClient();
	const result = await client
		.mutation(SignupMutation, { input: res.data })
		.toPromise();

	if (result.error) {
		return { message: "Failed to sign you up" };
	}

	await setToken(result.data.createUser.token);

	redirect("/");
}

export async function loginUser(prevState: any, formData: FormData) {
	const res = authSchema.safeParse(Object.fromEntries(formData.entries()));

	if (!res.success) {
		return { message: res.error.message };
	}

	const result = await graphqlClient(SigninMutation, { input: res.data });

	if (!result || result.errors) {
		return { message: "Failed to sign you in" };
	}

	await setToken(result.data.signin.token);

	redirect("/");
}

export async function logoutUser() {
	await removeToken();
	redirect("/signin");
}
