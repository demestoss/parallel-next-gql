"use client";
import { cn } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link href={href}>
			<div
				className={cn(
					"flex gap-2 items-center hover:bg-white border hover:border-black/20 border-transparent py-2 px-2 rounded-lg transition-all",
					isActive ? "bg-white border-black/20" : "",
				)}
			>
				{children}
			</div>
		</Link>
	);
}
