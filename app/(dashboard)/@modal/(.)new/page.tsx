"use client";
import NewIssueForm from "@/app/(dashboard)/_components/NewIssueForm";
import { Modal, ModalContent, ModalHeader } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

export default function NewIssueModalPage() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Modal
			size="2xl"
			isOpen={pathname === "/new"}
			placement="top-center"
			hideCloseButton
			onOpenChange={router.back}
		>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<span className="text-sm text-black/70">New issue</span>
						</ModalHeader>

						<NewIssueForm />
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
