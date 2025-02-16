"use client";
import { createIssue } from "@/actions/issues";
import SubmitButton from "@/app/_components/SubmitButton";
import { Button, Textarea } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

const initialState = {
	message: "",
};

export default function NewIssueForm() {
	const [state, action, pending] = useActionState(createIssue, initialState);

	return (
		<div>
			<form action={action}>
				<div className="px-6 flex flex-col gap-3 mb-2">
					<input
						autoFocus
						type="text"
						name="name"
						className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
						placeholder="Issue name"
					/>
					<div className="bg-white">
						<Textarea
							name="content"
							size="lg"
							variant="bordered"
							placeholder="Issue description"
							className="bg-white"
							classNames={{
								inputWrapper: "bg-white border-none shadow-none p-0",
								base: "bg-white p-0",
								input: "bg-white p-0",
								innerWrapper: "bg-white p-0",
							}}
						/>
					</div>
				</div>
				{state.message && (
					<div className="px-6 text-red-500 text-sm">{state.message}</div>
				)}
				<div className="border-t px-4 py-2 flex gap-3 justify-end">
					<Button as={Link} variant="ghost" href="/">
						Cancel
					</Button>
					<Button
						type="submit"
						variant="solid"
						className="bg-black text-white"
						isLoading={pending}
					>
						Create Issue
					</Button>
				</div>
			</form>
		</div>
	);
}
