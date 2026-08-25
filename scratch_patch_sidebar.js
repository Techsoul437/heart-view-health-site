import fs from 'fs';
import path from 'path';


const sidebarPath = 'f:/heartView/src/components/admin/Sidebar.tsx';
let content = fs.readFileSync(sidebarPath, 'utf8');

// Add subItems to SidebarMenuItem
content = content.replace(
  /interface SidebarMenuItem \{\s*title: string;\s*href: string;\s*icon: keyof typeof iconMap;\s*\}/g,
  `interface SidebarMenuItem {\n  title: string;\n  href: string;\n  icon: keyof typeof iconMap;\n  subItems?: { title: string, href: string }[];\n}`
);

// Add ChevronDown to lucide-react imports if not there
if (!content.includes('ChevronDown')) {
  content = content.replace(
    /ChevronRight,/,
    `ChevronRight,\n  ChevronDown,`
  );
}

// Add state for expanded items
content = content.replace(
  /const \[isOpen, setIsOpen\] = useState\(false\);/,
  `const [isOpen, setIsOpen] = useState(false);\n  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});\n\n  const toggleExpand = (title: string, e: React.MouseEvent) => {\n    e.preventDefault();\n    e.stopPropagation();\n    setExpandedItems(prev => ({ ...prev, [title]: !prev[title] }));\n  };`
);

// Update mapping logic
const oldMapping = `              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={\`
                    flex
                    h-16
                    items-center
                    justify-start
                    rounded-2xl
                    border
                    px-4
                    transition-all
                    duration-300
                    \${isActive
                      ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                      : "border-transparent text-gray-500 hover:bg-gray-50"
                    }\`
                  }
                >
                  <Icon
                    className={\`mr-3 h-5 w-5 \${
                      isActive ? "text-emerald-500" : "text-gray-400"
                    }\`}
                  />
                  <span className="font-medium text-sm">{item.title}</span>
                </Link>
              );`;

const newMapping = `              const isExpanded = expandedItems[item.title] || false;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isAnySubActive = hasSubItems && item.subItems.some(sub => pathname.startsWith(sub.href));

              return (
                <div key={index} className="flex flex-col">
                  <Link
                    href={item.href === "#" ? "#" : item.href}
                    onClick={(e) => {
                      if (hasSubItems) toggleExpand(item.title, e);
                      else setIsOpen(false);
                    }}
                    className={\`
                      flex h-14 items-center justify-between rounded-xl border px-4 transition-all duration-300
                      \${isActive || isAnySubActive
                        ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                        : "border-transparent text-gray-500 hover:bg-gray-50"
                      }
                    \`}
                  >
                    <div className="flex items-center">
                      <Icon className={\`mr-3 h-5 w-5 \${isActive || isAnySubActive ? "text-emerald-500" : "text-gray-400"}\`} />
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    {hasSubItems && (
                       isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    )}
                  </Link>
                  
                  {hasSubItems && isExpanded && (
                    <div className="ml-9 mt-1 flex flex-col gap-1 border-l-2 border-emerald-100 pl-4 py-1">
                      {item.subItems.map((sub, i) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={\`text-sm py-2 px-2 rounded-lg transition-colors \${isSubActive ? "text-emerald-600 bg-emerald-50 font-medium" : "text-gray-500 hover:text-emerald-600 hover:bg-gray-50"}\`}
                          >
                            {sub.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              );`;

content = content.replace(oldMapping, newMapping);
fs.writeFileSync(sidebarPath, content, 'utf8');
console.log('Sidebar patched successfully.');
