import "server-only";
import { cookies } from "next/headers";

export const tokenKey = "parallel_user_token";

export const setToken = async (token: string) => {
	const cookieStore = await cookies();
	cookieStore.set(tokenKey, token);
};

export const removeToken = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(tokenKey);
};

export const getToken = async () => {
	const cookieStore = await cookies();
	return cookieStore.get(tokenKey)?.value;
};
