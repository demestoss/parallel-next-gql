"use client";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";
import useFilter from "./useFilter";

export default function SortByFilter() {
	const [sortedBy, setSortedBy] = useFilter("sortedBy");

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="capitalize" variant="bordered" size={"sm"}>
					Sorted By: <Label sortedBy={sortedBy} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Multiple selection example"
				selectedKeys={sortedBy || ["STATUS"]}
				selectionMode="single"
				variant="flat"
				onSelectionChange={(value) => setSortedBy(value)}
			>
				<DropdownItem key="STATUS">Status</DropdownItem>
				<DropdownItem key="CREATED_AT">Creation date</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

function Label({ sortedBy }) {
	return (
		<span>{sortedBy?.has("CREATED_AT") ? "Creation date" : "Status"}</span>
	);
}
