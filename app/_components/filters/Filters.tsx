import SearchFilter from "./SearchFilter";
import SortByFilter from "./SortByFilter";
import StatusFilter from "./StatusFilter";

export default function Filters() {
	return (
		<div className="flex gap-3">
			<SearchFilter />
			<SortByFilter />
			<StatusFilter />
		</div>
	);
}
