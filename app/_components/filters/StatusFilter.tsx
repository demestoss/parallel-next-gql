"use client";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";
import useFilter from "./useFilter";

export default function StatusFilter() {
	const [statuses, setStatuses] = useFilter("statuses");

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="capitalize" variant="bordered" size={"sm"}>
					Status filter
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Multiple selection example"
				closeOnSelect={false}
				selectedKeys={statuses}
				selectionMode="multiple"
				variant="flat"
				onSelectionChange={setStatuses}
			>
				<DropdownItem key="BACKLOG">Backlog</DropdownItem>
				<DropdownItem key="INPROGRESS">In-progress</DropdownItem>
				<DropdownItem key="DONE">Done</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
