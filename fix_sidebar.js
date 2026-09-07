import fs from 'fs';

const path = 'f:/heartView/src/components/admin/Sidebar.tsx';
let text = fs.readFileSync(path, 'utf8');

const replaced = text.replace(/setExpandedItems\(prev => \(\{ \.\.\.prev, \[title\]: !prev\[title\] \}\)\);\s*<\/div>/,
`setExpandedItems(prev => ({ ...prev, [title]: !prev[title] }));
  };
  const dispatch = useDispatch();
  // Initials from userName
  const initials = (userName ?? "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const loginPathMap: Record<string, string> = {
    staff: "/lab-staff",
    "lab-admin": "/lab-admin",
    "heartview-admin": "/heartview-admin",
    "admin": "/admin",
  };
  const router = useRouter();
  const handleLogout = () => {
    if (role === 'lab-admin') {
      localStorage.removeItem("labAdmin_accessToken");
      localStorage.removeItem("labAdmin_refreshToken");
    } else if (role === 'staff' || role === 'lab-staff') {
      localStorage.removeItem("staff_accessToken");
      localStorage.removeItem("staff_refreshToken");
    } else if (role === 'heartview-admin') {
      localStorage.removeItem("heartviewAdmin_accessToken");
      localStorage.removeItem("heartviewAdmin_refreshToken");
    } else if (role === 'admin') {
      localStorage.removeItem("admin_accessToken");
      localStorage.removeItem("admin_refreshToken");
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("labProfile");
    localStorage.removeItem("fcmToken");
    sessionStorage.clear();

    setIsOpen(false);
    router.replace(loginHref);
  };
  const loginHref = loginPathMap[role ?? ""] ?? "/lab-admin";

  return (
    <>
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black px-4 lg:hidden">
        <div className="relative h-10 w-28 overflow-hidden">
          <Image
            src="/APP ICONSM.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>`);

if (replaced !== text) {
    fs.writeFileSync(path, replaced);
    console.log("Patched successfully");
} else {
    console.log("Not patched");
}
