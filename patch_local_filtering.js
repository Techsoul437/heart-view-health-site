import fs from 'fs';

let path1 = 'f:/heartView/src/components/admin/heartview-admin/StartCards.tsx';
let text1 = fs.readFileSync(path1, 'utf8');

text1 = text1.replace(
  /const newLabs = labs\.filter\(\(lab\) => \{\n  if \(\!lab\.createdAt\) return false;\n\n  const date = new Date\(lab\.createdAt\);\n\n  return \(\n    date\.getMonth\(\) === targetMonth &&\n    date\.getFullYear\(\) === targetYear\n  \);\n\}\)\.length;/,
  `const newLabs = labs.filter((lab) => {
  if (!lab.createdAt) return false;
  
  if (date) {
    const labDateStr = new Date(lab.createdAt).toISOString().split('T')[0];
    return labDateStr === date;
  }
  
  const labDate = new Date(lab.createdAt);
  return (
    labDate.getMonth() === targetMonth &&
    labDate.getFullYear() === targetYear
  );
}).length;`
);

fs.writeFileSync(path1, text1);

let path2 = 'f:/heartView/src/components/admin/lab-staff/StatsCard.tsx';
let text2 = fs.readFileSync(path2, 'utf8');

text2 = text2.replace(
  /const newPatientsCount = users\.filter\(\(u: \{ createdAt\?: string \}\) => \{\n          if \(\!u\.createdAt\) return false;\n          const date = new Date\(u\.createdAt\);\n          return date\.getMonth\(\) === targetMonth && date\.getFullYear\(\) === targetYear;\n        \}\)\.length;/,
  `const newPatientsCount = users.filter((u: { createdAt?: string }) => {
          if (!u.createdAt) return false;
          
          if (date) {
            const uDateStr = new Date(u.createdAt).toISOString().split('T')[0];
            return uDateStr === date;
          }
          
          const uDate = new Date(u.createdAt);
          return uDate.getMonth() === targetMonth && uDate.getFullYear() === targetYear;
        }).length;`
);

fs.writeFileSync(path2, text2);
console.log("Patched local date filtering in start cards");
