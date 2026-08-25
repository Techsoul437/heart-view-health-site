import fs from 'fs';
import path from 'path';

const dirs = [
  'src/components/admin/audit',
  'src/app/lab-admin/audit/dashboard',
  'src/app/lab-admin/audit/my-activity',
  'src/app/lab-admin/audit/auth-history',
  'src/app/lab-admin/audit/sessions',
  'src/app/lab-admin/audit/data-access',
  'src/app/lab-admin/audit/permissions',
  'src/app/lab-admin/audit/alerts',
  'src/app/lab-admin/audit/profile'
];

dirs.forEach(dir => {
  const fullPath = path.join('f:/heartView', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});
console.log('Directories created successfully.');
