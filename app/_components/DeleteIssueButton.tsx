"use client";
import { deleteIssue } from "@/actions/issues";
import { Button } from "@heroui/react";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";

export default function DeleteIssueButton({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			isIconOnly
			isLoading={isPending}
			className="hidden group-hover:flex"
			size={"sm"}
			aria-label="Delete"
			color="danger"
			variant={"flat"}
			onPress={() => {
				startTransition(() => {
					deleteIssue(id);
				});
			}}
		>
			<Trash2Icon size={16} />
		</Button>
	);
}
