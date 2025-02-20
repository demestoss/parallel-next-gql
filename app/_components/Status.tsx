"use client";

import { setIssueStatus } from "@/actions/issues";
import type { IssueStatusType } from "@/gql/types.mapper";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";
import { useOptimistic, useTransition } from "react";
import StatusRing from "./StatusRing";

const Status = ({
	status,
	issueId,
}: { status: IssueStatusType; issueId: string }) => {
	const [optimisticStatus, setOptimisticStatus] =
		useOptimistic<IssueStatusType>(status);
	const [isPending, startTransition] = useTransition();

	const onAction = (newStatus: IssueStatusType) => {
		startTransition(() => {
			setOptimisticStatus(newStatus);
			setIssueStatus(issueId, newStatus);
		});
	};

	return (
		<Dropdown
			classNames={{
				content: "p-0 border-small border-divider bg-background",
			}}
		>
			<DropdownTrigger>
				<button type="button" className="active:outline-none outline-none">
					<StatusRing status={optimisticStatus} />
				</button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Statuses"
				className="p-3"
				selectionMode="single"
				selectedKeys={[optimisticStatus]}
				onAction={onAction}
				itemClasses={{
					base: [
						"rounded-md",
						"text-default-500",
						"transition-opacity",
						"data-[hover=true]:text-foreground",
						"data-[hover=true]:bg-default-100",
						"dark:data-[hover=true]:bg-default-50",
						"data-[selectable=true]:focus:bg-default-50",
						"data-[pressed=true]:opacity-70",
						"data-[focus-visible=true]:ring-default-500",
					],
				}}
			>
				<DropdownItem
					key="BACKLOG"
					startContent={<StatusRing status={"BACKLOG"} />}
					textValue={"BACKLOG"}
				>
					<span>Backlog</span>
				</DropdownItem>
				<DropdownItem
					key="INPROGRESS"
					startContent={<StatusRing status={"INPROGRESS"} />}
					textValue={"INPROGRESS"}
				>
					<span>In Progress</span>
				</DropdownItem>
				<DropdownItem
					key="DONE"
					startContent={<StatusRing status={"DONE"} />}
					textValue={"DONE"}
				>
					<span>Done</span>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default Status;
