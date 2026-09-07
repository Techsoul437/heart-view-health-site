import fs from 'fs';

function updateProps(filePath, compName) {
  let text = fs.readFileSync(filePath, 'utf8');

  text = text.replace(
    new RegExp(`export default function ${compName}\\(\\)\\s*\\{`),
    `interface ${compName}Props { year?: number; month?: number; date?: string; }
export default function ${compName}({ year, month, date }: ${compName}Props) {`
  );

  fs.writeFileSync(filePath, text);
}

updateProps('f:/heartView/src/components/admin/lab-staff/LatestPaient.tsx', 'LatestPaient');
updateProps('f:/heartView/src/components/admin/lab-staff/LatestLink.tsx', 'LatestLinks');

console.log("Updated dummy prop types");
