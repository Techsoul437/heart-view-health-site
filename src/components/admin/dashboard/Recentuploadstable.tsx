type UploadRow = {
  report: string;
  patient: string;
  by: string;
  time: string;
  type: string;
};

type RecentUploadsType = {
  [year: number]: {
    [month: number]: UploadRow[];
  };
};

const recentUploads: RecentUploadsType = {
  2024: {
    5: [
      {
        report: "CT Chest Report.pdf",
        patient: "John Doe",
        by: "Dr. Admin",
        time: "10:20 AM",
        type: "ct",
      },
      {
        report: "MRI Brain Report.pdf",
        patient: "Sarah Smith",
        by: "Dr. Admin",
        time: "09:45 AM",
        type: "mri",
      },
      {
        report: "X-Ray Hand Report.pdf",
        patient: "Michael Brown",
        by: "Dr. Admin",
        time: "09:10 AM",
        type: "xray",
      },
      {
        report: "USG Abdomen Report.pdf",
        patient: "Emily Davis",
        by: "Dr. Admin",
        time: "08:35 AM",
        type: "usg",
      },
      {
        report: "Blood Test Report.pdf",
        patient: "David Wilson",
        by: "Dr. Admin",
        time: "08:05 AM",
        type: "blood",
      },
    ],

    6: [
      {
        report: "CT Spine Report.pdf",
        patient: "Priya Patel",
        by: "Dr. Admin",
        time: "11:00 AM",
        type: "ct",
      },
      {
        report: "MRI Knee Report.pdf",
        patient: "Raj Shah",
        by: "Dr. Admin",
        time: "10:30 AM",
        type: "mri",
      },
      {
        report: "X-Ray Chest Report.pdf",
        patient: "Neha Mehta",
        by: "Dr. Admin",
        time: "10:00 AM",
        type: "xray",
      },
      {
        report: "Echo Report.pdf",
        patient: "Amit Kumar",
        by: "Dr. Admin",
        time: "09:20 AM",
        type: "echo",
      },
      {
        report: "PET Scan Report.pdf",
        patient: "Sneha Joshi",
        by: "Dr. Admin",
        time: "08:50 AM",
        type: "pet",
      },
    ],
  },

  2025: {
    5: [
      {
        report: "CT Brain Report.pdf",
        patient: "Ravi Desai",
        by: "Dr. Admin",
        time: "10:15 AM",
        type: "ct",
      },
      {
        report: "MRI Shoulder Report.pdf",
        patient: "Pooja Nair",
        by: "Dr. Admin",
        time: "09:50 AM",
        type: "mri",
      },
      {
        report: "X-Ray Wrist Report.pdf",
        patient: "Kiran Rao",
        by: "Dr. Admin",
        time: "09:25 AM",
        type: "xray",
      },
      {
        report: "USG Liver Report.pdf",
        patient: "Divya Iyer",
        by: "Dr. Admin",
        time: "08:55 AM",
        type: "usg",
      },
      {
        report: "CBC Report.pdf",
        patient: "Mohan Verma",
        by: "Dr. Admin",
        time: "08:20 AM",
        type: "blood",
      },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typeColors: Record<string, string> = {
  ct: "bg-red-500/10 text-red-300 border border-red-500/20",
  mri: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  xray: "bg-green-500/10 text-green-300 border border-green-500/20",
  usg: "bg-purple-500/10 text-purple-300 border border-purple-500/20",
  blood: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
  echo: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
  pet: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typeIcon: Record<string, string> = {
  ct: "CT",
  mri: "MR",
  xray: "XR",
  usg: "US",
  blood: "BL",
  echo: "EC",
  pet: "PT",
};

interface RecentUploadsTableProps {
  year: number;
  month: number;
}

export default function RecentUploadsTable({
  year,
  month,
}: RecentUploadsTableProps) {
  const data =
    recentUploads[year]?.[month] || recentUploads[2024][5];

  return (
    <div
      className="
        rounded-2xl
        border border-black/10
        bg-[#111827]/80
        p-5
        shadow-xl
        min-h-125
        
        backdrop-blur-md
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h4 className="text-lg md:text-xl xl:text-2xl text-black">
            Recent Uploads
          </h4>

          <p className="mt-1 text-[#64748B]">
            Latest uploaded reports
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
        <table className="w-full min-w-162.5">
          <thead>
            <tr
              className="
                border-b border-black/10
                text-left
                uppercase
                tracking-wider
                text-slate-200
              "
            >
              <th className="pb-3 pr-4">Report Name</th>
              <th className="pb-3 pr-4">Patient Name</th>
              <th className="pb-3 pr-4">Uploaded By</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="
                  border-b border-white/5
                  transition-all
                  hover:bg-black/5
                  last:border-0
                "
              >
                {/* Report */}
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[#64748B]">
                      {row.report}
                    </span>
                  </div>
                </td>

                {/* Patient */}
                <td className="py-4 pr-4 text-[#64748B]">
                  {row.patient}
                </td>

                {/* Uploaded By */}
                <td className="py-4 pr-4 text-[#64748B]">
                  {row.by}
                </td>

                {/* Time */}
                <td className="py-4 text-slate-500">
                  {row.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}