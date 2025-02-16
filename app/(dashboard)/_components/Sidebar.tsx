import { logoutUser } from "@/actions/auth";
import Logo from "@/app/_components/Logo";
import { Boxes, LayoutGrid, Settings } from "lucide-react";
import Link from "next/link";
import CurrentUserAvatar from "./CurrentUserAvatar";
import NavLink from "./NavLink";

const links = [
	{ href: "/", name: "Issues", Icon: Boxes },
	{ href: "/projects", name: "Projects", Icon: LayoutGrid },
	{ href: "/settings", name: "Settings", Icon: Settings },
];

const Sidebar = () => {
	return (
		<div className="flex flex-col w-full h-full py-3">
			<div className="px-4 mb-8">
				<Link href="/">
					<Logo />
				</Link>
			</div>
			<CurrentUserAvatar />
			<div className="px-4 mt-6 grow flex flex-col justify-between">
				<div>
					{links.map((link) => {
						return (
							<div key={link.href}>
								<NavLink href={link.href}>
									<link.Icon size={16} />
									<span>{link.name}</span>
								</NavLink>
							</div>
						);
					})}
				</div>

				<button
					type="button"
					className="w-full flex gap-2 items-center hover:bg-white border hover:border-black/20 border-transparent py-2 px-2 rounded-lg transition-all"
					onClick={logoutUser}
				>
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
