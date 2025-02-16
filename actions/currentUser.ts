import { getUserFromToken } from "@/utils/auth";
import { getToken } from "@/utils/token";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
	const token = await getToken();
	const user = await getUserFromToken(token);

	if (!user) {
		redirect("/signin");
	}

	return user;
});
