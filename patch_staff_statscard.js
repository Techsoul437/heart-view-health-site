import fs from 'fs';

const path = 'f:/heartView/src/components/admin/lab-staff/StatsCard.tsx';
let text = fs.readFileSync(path, 'utf8');

text = text.replace(
  /interface StatsCardsProps \{\n  year\?: number;\n  month\?: number;\n\}/,
  `interface StatsCardsProps { year?: number; month?: number; date?: string; }`
);

text = text.replace(
  /export default function StatCard\(\{\n  year = 2025,\n  month = 1,\n\}: StatsCardsProps\) \{/,
  `export default function StatCard({ year = new Date().getFullYear(), month = new Date().getMonth() + 1, date }: StatsCardsProps) {`
);

text = text.replace(
  /dispatch\(getReportLinkStats\(\{ year, month \}\)\)/,
  `dispatch(getReportLinkStats({ year, month, date }))`
);

text = text.replace(
  /dispatch\(getAllUsers\(\)\)\.unwrap\(\)/,
  `dispatch(getAllUsers({ year, month, date })).unwrap()`
);

text = text.replace(
  /  \}, \[dispatch, year, month\]\);/,
  `  }, [dispatch, year, month, date]);`
);

fs.writeFileSync(path, text);
console.log("StatsCard in lab-staff updated");
