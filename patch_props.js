import fs from 'fs';

let heartviewPath = 'f:/heartView/src/components/admin/heartview-admin/HeartviewAdmin.tsx';
let heartviewText = fs.readFileSync(heartviewPath, 'utf8');

heartviewText = heartviewText.replace(
  /<StartCards year=\{year\} month=\{month\} \/>/,
  `<StartCards year={year} month={month} date={selectedDate} />`
);

heartviewText = heartviewText.replace(
  /<ResentPaient \/>/,
  `<ResentPaient year={year} month={month} date={selectedDate} />`
);

heartviewText = heartviewText.replace(
  /<ResentLab \/>/,
  `<ResentLab year={year} month={month} date={selectedDate} />`
);

fs.writeFileSync(heartviewPath, heartviewText);

let staffPath = 'f:/heartView/src/components/admin/lab-staff/LabStaffMain.tsx';
let staffText = fs.readFileSync(staffPath, 'utf8');

staffText = staffText.replace(
  /<StatCard><\/StatCard>/,
  `<StatCard year={year} month={month} date={selectedDate} />`
);

staffText = staffText.replace(
  /<LatestPatient><\/LatestPatient>/,
  `<LatestPatient year={year} month={month} date={selectedDate} />`
);

staffText = staffText.replace(
  /<LatestLinks><\/LatestLinks>/,
  `<LatestLinks year={year} month={month} date={selectedDate} />`
);

fs.writeFileSync(staffPath, staffText);
console.log("Passed props down");
