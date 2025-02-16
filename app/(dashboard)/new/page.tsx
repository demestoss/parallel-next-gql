import NewIssueForm from "@/app/(dashboard)/_components/NewIssueForm";

export default function NewIssuePage() {
	return (
		<div>
			<h6 className="px-6 pt-4 text-md text-black/80 mb-2">New Issue</h6>

			<NewIssueForm />
		</div>
	);
}
