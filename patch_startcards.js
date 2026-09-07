import fs from 'fs';

const path = 'f:/heartView/src/components/admin/heartview-admin/StartCards.tsx';
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
  /export default function StartCards\(\{\n  year = 2025,\n  month = 1,\n\}: StatsCardsProps\) \{/,
  `export default function StartCards({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  date,
}: StatsCardsProps) {`
);

text = text.replace(
  /dispatch\(getAllLabs\(\)\);/,
  `dispatch(getAllLabs({ year, month, date }));`
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
console.log("StartCards updated");
