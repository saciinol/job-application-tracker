const Table = ({ children }) => {
	const columns = [
		'Company Name',
		'Position',
		'Status',
		'Location',
		'Salary Range',
		'URL',
		'Applied Date',
		'Deadline',
		'Notes',
	];

	return (
		<div className="border border-primary/10 rounded-lg">
			<div className="grid grid-cols-9 gap-4 border-b border-primary/10">
        {columns.map(col => (
          <div key={col} className="line-clamp-1 p-3 font-semibold text-nowrap text-primary">
            {col}
          </div>
        ))}
      </div>
			<div>{children}</div>
		</div>
	);
};

export const TableItem = ({application}) => {
  const {company_name, position, status, location, salary_range, job_url, notes, applied_date, deadline} = application;

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
  }

  return (
    <div className="grid grid-cols-9 gap-4 border-b border-primary/10 text-primary">
        <div className="line-clamp-1 p-3 text-nowrap">{company_name}</div>
        <div className="line-clamp-1 p-3 text-nowrap">{position}</div>
        <div className="line-clamp-1 p-3 text-nowrap">{status}</div>
        <div className="line-clamp-1 p-3 text-nowrap">{location}</div>
        <div className="line-clamp-1 p-3 text-nowrap">{salary_range}</div>
        <div className="line-clamp-1 p-3 text-nowrap">{job_url}</div>
        <div className="line-clamp-1 p-3 text-nowrap">{convertDate(applied_date)}</div>
        <div className="line-clamp-1 p-3 text-nowrap">{convertDate(deadline)}</div>
        <div className="line-clamp-1 p-3 text-nowrap mr-3">{notes}</div>
    </div>
  )
}

export default Table;
