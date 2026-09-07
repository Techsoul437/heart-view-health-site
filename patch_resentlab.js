import fs from 'fs';

const path = 'f:/heartView/src/components/admin/heartview-admin/ResentLab.tsx';
let text = fs.readFileSync(path, 'utf8');

text = text.replace(
  /export default function ResentLab\(\) \{/,
  `interface ResentLabProps { year?: number; month?: number; date?: string; }
export default function ResentLab({ year, month, date }: ResentLabProps) {`
);

text = text.replace(
  /dispatch\(getAllLabs\(\)\);/,
  `dispatch(getAllLabs({ year, month, date }));`
);

text = text.replace(
  /  \}, \[dispatch\]\);/,
  `  }, [dispatch, year, month, date]);`
);

fs.writeFileSync(path, text);
console.log("ResentLab updated");
