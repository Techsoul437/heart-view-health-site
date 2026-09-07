import fs from 'fs';
const path = 'f:/heartView/src/components/admin/dashboard/Statscards.tsx';
let text = fs.readFileSync(path, 'utf8');

text = text.replace(
  /interface StatsCardsProps \{\n  year\?: number;\n  month\?: number;\n\}/,
  `interface StatsCardsProps {
  year?: number;
  month?: number;
  date?: string;
}`
);

text = text.replace(
  /export default function StatsCards\(\{\n  year = [0-9]+,\n  month = [0-9]+,\n\}: StatsCardsProps\) \{/,
  `export default function StatsCards({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  date,
}: StatsCardsProps) {`
);

text = text.replace(
  /const result = await dispatch\(getReportLinkStats\(\{ year, month \}\)\);/,
  `const result = await dispatch(getReportLinkStats({ year, month, date }));`
);

text = text.replace(
  /\[dispatch, year, month\]/,
  `[dispatch, year, month, date]`
);

fs.writeFileSync(path, text);
console.log("StatsCards updated");
