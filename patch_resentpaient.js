import fs from 'fs';

const path = 'f:/heartView/src/components/admin/heartview-admin/ResentPaient.tsx';
let text = fs.readFileSync(path, 'utf8');

text = text.replace(
  /export default function RecentPatientsCard\(\) \{/,
  `interface RecentPatientsProps { year?: number; month?: number; date?: string; }
export default function RecentPatientsCard({ year, month, date }: RecentPatientsProps) {`
);

text = text.replace(
  /const response = await dispatch\(getAllUsers\(\)\)\.unwrap\(\);/,
  `const response = await dispatch(getAllUsers({ year, month, date })).unwrap();`
);

text = text.replace(
  /  \}, \[dispatch\]\);/,
  `  }, [dispatch, year, month, date]);`
);

fs.writeFileSync(path, text);
console.log("ResentPaient updated");
