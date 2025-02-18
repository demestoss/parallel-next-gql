import DeleteIssueButton from "@/app/_components/DeleteIssueButton";
import type { Issue } from "@/gql/types";
import Status from "./Status";

const IssueItem = ({ issue }: { issue: Issue }) => {
	const displayId = issue.id.split("-").pop()?.slice(-3);

	return (
		<div className="group px-4 h-[40px] border-b flex items-center hover:bg-slate-50 justify-between">
			<div className="grow flex items-center gap-4">
				<span className="text-sm text-slate-300 w-[80px]">
					{`PAR-${displayId}`.toUpperCase()}
				</span>
				<Status status={issue.status} issueId={issue.id} />
				<span>{issue.name}</span>
			</div>

			<div className="flex gap-2">
				<DeleteIssueButton id={issue.id} />
			</div>
		</div>
	);
};

export default IssueItem;
