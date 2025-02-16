import { getCurrentUser } from "@/actions/currentUser";
import { Avatar } from "@heroui/react";

export default async function CurrentUserAvatar() {
	const user = await getCurrentUser();

	return (
		<div className="flex gap-3 items-center pl-4">
			<Avatar name={user.email} className="shrink-0 grow size-8" />
			<span className="text-black/75 truncate">{user.email}</span>
		</div>
	);
}
