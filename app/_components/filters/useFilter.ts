import { debounce } from "@heroui/shared-utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useMemo, useState } from "react";

type FilterName = "statuses" | "search" | "sortedBy";
type FilterValue<T extends FilterName> = T extends "statuses"
	? string[]
	: string | null;

export default function useFilter<T extends FilterName>(name: T) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [value, setValue] = useState(() => {
		switch (name) {
			case "statuses":
				return (searchParams.getAll(name) || []) as FilterValue<T>;
			case "search":
			case "sortedBy":
				return searchParams.get(name) as FilterValue<T>;
		}
	});

	const onSearchParamsChange = useCallback(
		debounce((value: FilterValue<T>) => {
			const params = new URLSearchParams(searchParams.toString());

			if (value) {
				if (typeof value === "string") {
					params.set(name, value);
				} else {
					params.delete(name);
					// biome-ignore lint/complexity/noForEach: <explanation>
					value.forEach((v) => params.append(name, v));
				}

				router.push(`${pathname}?${params.toString()}`);
			}
		}, 300),
		[name, searchParams, pathname, router],
	);

	const onChange = useCallback(
		(value: FilterValue<T>) => {
			setValue(value);
			onSearchParamsChange(value);
		},
		[onSearchParamsChange],
	);

	return [value, onChange] as const;
}
