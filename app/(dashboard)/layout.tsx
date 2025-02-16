import PageHeader from "@/app/_components/PageHeader";
import Filters from "@/app/_components/filters/Filters";
import { Tooltip } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({
	children,
	modal,
}: PropsWithChildren<{
	modal?: React.ReactNode;
}>) => {
	return (
		<div className="relative h-screen w-screen bg-slate-50">
			<aside className="absolute left-0 top-0 w-[200px] h-full">
				<Sidebar />
			</aside>
			<main className="w-[calc(100vw-200px)] h-full ml-[200px]">
				<div className="p-3 h-full w-full">
					<div className="rounded-lg border w-full h-full bg-white">
						<PageHeader title="All issues">
							<Tooltip content="New Issue">
								<Link
									href="/new"
									className="text-white bg-black p-1 rounded-md"
								>
									<PlusIcon size={14} />
								</Link>
							</Tooltip>
							<Filters />
						</PageHeader>

						{children}
					</div>
				</div>

				<div>{modal}</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
