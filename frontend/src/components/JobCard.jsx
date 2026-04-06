export default function JobCard({ job, onSave }) {
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{job.title}</h3>
      <p className="text-sm text-slate-600 mt-1">{job.company} - {job.location}</p>
      <p className="text-sm mt-2 line-clamp-3">{job.description?.replace(/<[^>]+>/g, "")}</p>
      <div className="mt-3 flex gap-2">
        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">
          Apply
        </a>
        <button className="px-3 py-1.5 rounded bg-slate-100 text-sm" onClick={() => onSave(job)}>
          Save
        </button>
      </div>
    </div>
  );
}
