"use client";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
} from "@heroui/react";
import useFilter from "./useFilter";

export default function SearchFilter() {
	const [search, setSearch] = useFilter("search");

	return (
		<Input
			placeholder="Search"
			size={"sm"}
			className="w-[240px]"
			variant={"flat"}
			value={search || ""}
			onChange={(e) => setSearch(e.target.value)}
		/>
	);
}
