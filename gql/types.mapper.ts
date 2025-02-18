export const DBIssueStatus = {
	DONE: "done",
	TODO: "todo",
	INPROGRESS: "inprogress",
	BACKLOG: "backlog",
} as const;
export type DBIssueStatus = (typeof DBIssueStatus)[keyof typeof DBIssueStatus];

export const IssueStatusType = {
	DONE: "DONE",
	TODO: "TODO",
	INPROGRESS: "INPROGRESS",
	BACKLOG: "BACKLOG",
} as const;
export type IssueStatusType =
	(typeof IssueStatusType)[keyof typeof IssueStatusType];
