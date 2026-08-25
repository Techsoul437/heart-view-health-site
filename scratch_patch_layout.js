import fs from 'fs';
import path from 'path';

const layoutPath = 'f:/heartView/src/app/lab-admin/layout.tsx';
let content = fs.readFileSync(layoutPath, 'utf8');

// The place to inject is before return (
const injectionPoint = 'return (';
const auditMenuCode = `
  if (hasAnyPerm("audit")) {
    sidebarMenu.push({
      title: "Audit & Security",
      href: "#",
      icon: "audit", // "audit" icon should exist in Sidebar iconMap (ClipboardList)
      subItems: [
        { title: "Audit Dashboard", href: "/lab-admin/audit/dashboard" },
        { title: "My Activity Log", href: "/lab-admin/audit/my-activity" },
        { title: "Login & Authentication", href: "/lab-admin/audit/auth-history" },
        { title: "Active Sessions", href: "/lab-admin/audit/sessions" },
        { title: "Data Access Audit", href: "/lab-admin/audit/data-access" },
        { title: "Role & Permission", href: "/lab-admin/audit/permissions" },
        { title: "Security Alerts", href: "/lab-admin/audit/alerts" },
        { title: "Security Profile", href: "/lab-admin/audit/profile" },
      ]
    });
  }

  return (
`;

content = content.replace(injectionPoint, auditMenuCode);
fs.writeFileSync(layoutPath, content, 'utf8');
console.log('Layout patched successfully.');
