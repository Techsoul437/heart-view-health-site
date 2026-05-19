type PendingReport = {
  report: string;
  patient: string;
  by: string;
  since: string;
};

type PendingReportsData = {
  [year: number]: {
    [month: number]: PendingReport[];
  };
};

const pendingReports: PendingReportsData = {
  2024: {
    5: [
      { report: "CT Angiography.pdf", patient: "Robert Johnson", by: "Dr. Admin", since: "2h 15m" },
      { report: "MRI Spine Report.pdf", patient: "Lisa Taylor", by: "Dr. Admin", since: "1h 40m" },
      { report: "PET Scan Report.pdf", patient: "James Anderson", by: "Dr. Admin", since: "1h 10m" },
      { report: "X-Ray Chest Report.pdf", patient: "Jessica White", by: "Dr. Admin", since: "50m" },
      { report: "Echo Report.pdf", patient: "Daniel Thomas", by: "Dr. Admin", since: "30m" },
    ],
    6: [
      { report: "CT Head Report.pdf", patient: "Anjali Singh", by: "Dr. Admin", since: "3h 05m" },
      { report: "MRI Neck Report.pdf", patient: "Rahul Gupta", by: "Dr. Admin", since: "2h 20m" },
      { report: "PET Brain Report.pdf", patient: "Sunita Patil", by: "Dr. Admin", since: "1h 55m" },
      { report: "USG Pelvis Report.pdf", patient: "Kavita More", by: "Dr. Admin", since: "1h 15m" },
      { report: "Bone Scan Report.pdf", patient: "Vijay Khanna", by: "Dr. Admin", since: "45m" },
    ],
  },

  2025: {
    5: [
      { report: "CT Thorax Report.pdf", patient: "Aarav Bose", by: "Dr. Admin", since: "2h 30m" },
      { report: "MRI Lumbar Report.pdf", patient: "Ishaan Sen", by: "Dr. Admin", since: "1h 50m" },
      { report: "PET Lung Report.pdf", patient: "Arjun Tiwari", by: "Dr. Admin", since: "1h 20m" },
      { report: "Echo Stress Report.pdf", patient: "Meera Das", by: "Dr. Admin", since: "55m" },
      { report: "CT KUB Report.pdf", patient: "Nisha Roy", by: "Dr. Admin", since: "35m" },
    ],
  },
};

interface PendingReportsTableProps {
  year: number;
  month: number;
}

export default function PendingReportsTable({
  year,
  month,
}: PendingReportsTableProps) {
  const data =
    pendingReports[year]?.[month] || pendingReports[2024][5];

  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-[#111827]/80
        p-5
        shadow-xl
        backdrop-blur-md
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h4 className="text-lg md:text-xl xl:text-2xl text-white">
            Pending Reports
          </h4>

          <p className="mt-1 text-slate-400">
            Reports waiting for review
          </p>
        </div>

        <button
          className="
            rounded-xl
            border border-indigo-500/20
            bg-indigo-500/10
            px-3 py-1.5
            text-indigo-300
            transition-all
            hover:bg-indigo-500/20
          "
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr
              className="
                border-b border-white/10
                text-left
                uppercase
                text-slate-200
              "
            >
              <th className="pb-3 pr-4">Report Name</th>
              <th className="pb-3 pr-4">Patient Name</th>
              <th className="pb-3 pr-4">Uploaded By</th>
              <th className="pb-3">Pending Since</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="
                  border-b border-white/5
                  transition-all
                  hover:bg-white/5
                  last:border-0
                "
              >
                {/* Report */}
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-orange-400/10
                        bg-orange-500/10
                      "
                    >
                      <svg
                        className="h-4 w-4 text-orange-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>

                    <span className="font-medium text-slate-400">
                      {row.report}
                    </span>
                  </div>
                </td>

                {/* Patient */}
                <td className="py-4 pr-4 text-slate-400">
                  {row.patient}
                </td>

                {/* Uploaded by */}
                <td className="py-4 pr-4 text-slate-400">
                  {row.by}
                </td>

                {/* Pending */}
                <td className="py-4">
                  <span
                    className="
                      rounded-full
                      border border-orange-500/20
                      bg-orange-500/10
                      px-3 py-1
                      text-orange-300
                    "
                  >
                    {row.since}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}