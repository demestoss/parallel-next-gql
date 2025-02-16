const PageHeader = ({ title, children }) => {
	return (
		<div className="w-full flex items-center px-4 h-[40px] border-b gap-4">
			<span className="shrink-0">{title}</span>
			<div className="justify-between flex items-center w-full">{children}</div>
		</div>
	);
};

export default PageHeader;
