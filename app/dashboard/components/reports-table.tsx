export default function ReportsTable() {
  const reports = [
    {
      title: "Pothole on Main Road",
      status: "Pending",
      location: "Colombo",
    },
    {
      title: "Street Light Damage",
      status: "Resolved",
      location: "Kandy",
    },
    {
      title: "Garbage Overflow",
      status: "In Progress",
      location: "Galle",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Recent Reports
      </h2>

      <div className="space-y-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {report.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {report.location}
              </p>
            </div>

            <div className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300 border border-cyan-500/30">
              {report.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}