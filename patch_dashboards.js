import fs from 'fs';

function replaceWithDatePicker(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');

  // Replace useState
  text = text.replace(
    /const \[year, setYear\] = useState<number>\([\s\S]*?MONTHS\.find\(\(m\) => m\.value === month\)\?\.label \?\? "";/,
    `// Convert local date to YYYY-MM-DD correctly taking timezone into account
  const tzOffset = now.getTimezoneOffset() * 60000; 
  const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1).split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(localISOTime);

  const dateObj = new Date(selectedDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;`
  );

  // Replace select dropdowns with date picker
  text = text.replace(
    /<div className="relative">\s*<select\s*value=\{month\}[\s\S]*?<\/div>[\s\S]*?<div className="relative">\s*<select\s*value=\{year\}[\s\S]*?<\/div>[\s\S]*?<div[\s\S]*?<FiCalendar className="text-\[#64748B\]" \/>[\s\S]*?<\/div>/,
    `<div className="relative flex items-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="
                rounded-xl
                border border-black/10
                bg-[#f7f7f7]
                px-4 py-2.5
                font-medium
                text-[#64748B]
                backdrop-blur-md
                shadow-lg
                outline-none
                transition-all
                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-500/30
                cursor-pointer
              "
            />
          </div>`
  );

  fs.writeFileSync(filePath, text);
}

replaceWithDatePicker('f:/heartView/src/components/admin/heartview-admin/HeartviewAdmin.tsx');
replaceWithDatePicker('f:/heartView/src/components/admin/lab-staff/LabStaffMain.tsx');

console.log("Dashboards updated");
