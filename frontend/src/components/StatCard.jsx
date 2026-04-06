export default function StatCard({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
