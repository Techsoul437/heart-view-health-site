"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FlaskConical,
  Users,
  FileText,
  ScanLine,
  BookOpen,
  UserCog,
  Bell,
  TrendingUp,
  Settings,
  Search,
  CheckSquare,
  Square,
  ChevronDown,
  Shield,
  UserCircle,
  Layers,
  KeyRound,
  ChevronsDownUp,
  ChevronsUpDown,
  Stethoscope,
  Clock,
  UserCheck,
  SearchX,
  Check,
} from "lucide-react";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import ResetButton from "@/Ui/buttons/ResetButton";
import { auth } from "@/lib/firebase";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type RoleId = "admin" | "staff";

interface Permission {
  id: string;
  label: string;
  desc: string;
  admin: boolean;
  staff: boolean;
}

interface ModuleDef {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  permissions: Permission[];
}

interface RoleDef {
  id: RoleId;
  label: string;
  icon: LucideIcon;
}

interface Tint {
  bg: string;
  fg: string;
}

/** permId -> enabled */
type ModulePermState = Record<string, boolean>;
/** moduleId -> ModulePermState */
type RolePermState = Record<string, ModulePermState>;
/** roleId -> RolePermState */
type PermissionState = Record<RoleId, RolePermState>;

/* ------------------------------------------------------------------ */
/*  Design tokens (used only where Tailwind can't take a dynamic value) */
/* ------------------------------------------------------------------ */
const STAT_TINTS: Tint[] = [
  { bg: "#EEF3FF", fg: "#2F6FED" },
  { bg: "#ECFDF5", fg: "#16A34A" },
  { bg: "#FFFBEB", fg: "#D97706" },
  { bg: "#F5F3FF", fg: "#7C3AED" },
];

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const MODULES: ModuleDef[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "Overview widgets, KPIs and shortcuts",
    icon: LayoutDashboard,
    permissions: [
      { id: "view_dashboard", label: "View Dashboard", desc: "Access the dashboard", admin: true, staff: true },
      { id: "view_widgets", label: "View Dashboard Widgets", desc: "See KPI cards and charts", admin: true, staff: true },
      { id: "view_summary", label: "View Reports Summary", desc: "See a rollup of recent report activity", admin: true, staff: true },
      { id: "export_data", label: "Export Dashboard Data", desc: "Download dashboard metrics as CSV or PDF", admin: true, staff: false },
    ],
  },
  {
    id: "patients",
    title: "Patient Management",
    desc: "Patient records and demographic data",
    icon: Users,
    permissions: [
      { id: "view_patients", label: "View Patients", desc: "Search and open patient profiles", admin: true, staff: true },
      { id: "create_patient", label: "Create Patient", desc: "Register a new patient record", admin: true, staff: true },
      { id: "edit_patient", label: "Edit Patient", desc: "Update demographic or contact details", admin: true, staff: true },
      { id: "delete_patient", label: "Delete Patient", desc: "Permanently remove a patient record", admin: true, staff: false },
      { id: "export_patient", label: "Export Patient Data", desc: "Download patient records in bulk", admin: true, staff: false },
    ],
  },
  {
    id: "reports",
    title: "Report Management",
    desc: "Manage patient test reports and results",
    icon: FileText,
    permissions: [
      { id: "view_reports", label: "View Reports", desc: "View all patient reports", admin: true, staff: true },
      { id: "create_reports", label: "Upload & Create Reports", desc: "Upload new reports for patients", admin: true, staff: true },
      { id: "edit_reports", label: "Edit Reports", desc: "Modify existing report data", admin: true, staff: false },
      { id: "print_reports", label: "Print Reports", desc: "Print physical copies of reports", admin: true, staff: true },
      { id: "delete_reports", label: "Delete Reports", desc: "Permanently delete patient reports", admin: true, staff: false },
    ],
  },
  {
    id: "report_links",
    title: "Report Links",
    desc: "Manage and send report links to patients",
    icon: FileText,
    permissions: [
      { id: "view_links", label: "View Report Links", desc: "Access the report links page", admin: true, staff: true },
      { id: "send_link", label: "Create/Send Report Link", desc: "Send a report link to a patient", admin: true, staff: true },
      { id: "resend_link", label: "Resend Report Link", desc: "Resend the report link", admin: true, staff: true },
      { id: "view_status", label: "View Link Status", desc: "See pending, sent, viewed, downloaded status", admin: true, staff: true },
      { id: "track_viewed", label: "Track Report Viewed", desc: "Track if patient opened the report", admin: true, staff: true },
      { id: "track_downloaded", label: "Track Report Downloaded", desc: "Track if report was downloaded", admin: true, staff: true },
    ],
  },
  {
    id: "staff",
    title: "Staff Management",
    desc: "Team members, roles and access",
    icon: UserCog,
    permissions: [
      { id: "view_staff", label: "View Staff", desc: "See the list of staff members", admin: true, staff: false },
      { id: "add_staff", label: "Add Staff", desc: "Invite a new staff member", admin: true, staff: false },
      { id: "edit_staff", label: "Edit Staff", desc: "Update staff profile and contact info", admin: true, staff: false },
      { id: "deactivate_staff", label: "Deactivate Staff", desc: "Suspend a staff member's access", admin: true, staff: false },
      { id: "manage_roles", label: "Manage Staff Roles", desc: "Assign roles to staff members", admin: true, staff: false },
    ],
  },
];

const ROLES: RoleDef[] = [
  { id: "admin", label: "Lab Admin", icon: Stethoscope },
  { id: "staff", label: "Lab Staff", icon: UserCheck },
];

const TOTAL_PERMISSIONS = MODULES.reduce((n, m) => n + m.permissions.length, 0);

function buildDefaultState(): PermissionState {
  const state: PermissionState = { admin: {}, staff: {} };
  MODULES.forEach((m) => {
    state.admin[m.id] = {};
    state.staff[m.id] = {};
    m.permissions.forEach((p) => {
      state.admin[m.id][p.id] = p.admin;
      state.staff[m.id][p.id] = p.staff;
    });
  });
  return state;
}

function formatNow(): string {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-linear-to-br peer-checked:from-[#2F6FED] peer-checked:to-[#1D4ED8]" />
      <span className="absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200 ease-out peer-checked:translate-x-5" />
    </label>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  tint: Tint;
}

function StatCard({ icon: Icon, label, value, sub, tint }: StatCardProps) {
  return (
    <div className="flex items-start gap-3.5 rounded-[18px] border border-gray-200 bg-white p-[18px_20px] shadow-[0_1px_2px_rgba(16,24,40,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_10px_24px_-10px_rgba(16,24,40,0.14)]">
      <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-xl" style={{ background: tint.bg }}>
        <Icon size={19} strokeWidth={2} color={tint.fg} />
      </div>
      <div>
        <div className="mb-1 text-[13px] font-medium text-gray-500">{label}</div>
        <div className="text-2xl leading-tight tracking-tight text-gray-900">{value}</div>
        {sub && <div className="mt-[3px] text-[11.5px] text-gray-400">{sub}</div>}
      </div>
    </div>
  );
}

interface ToolbarButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function ToolbarButton({ icon: Icon, label, onClick, disabled }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-[10px] border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] font-medium text-gray-500 transition-all duration-150 hover:border-[#CBDCFF] hover:bg-[#EEF3FF] hover:text-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon size={14.5} strokeWidth={2.2} />
      <span>{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Module card                                                        */
/* ------------------------------------------------------------------ */

interface ModuleCardProps {
  module: ModuleDef;
  state: RolePermState;
  onToggle: (moduleId: string, permId: string) => void;
  expanded: boolean;
  onToggleExpand: () => void;
  query: string;
}

function ModuleCard({ module, state, onToggle, expanded, onToggleExpand, query }: ModuleCardProps) {
  const Icon = module.icon;
  const perms = module.permissions.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      p.label.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      module.title.toLowerCase().includes(q)
    );
  });

  if (query && perms.length === 0) return null;

  const enabledCount = module.permissions.filter((p) => state[module.id]?.[p.id]).length;
  const totalCount = module.permissions.length;
  const allOn = enabledCount === totalCount;
  const noneOn = enabledCount === 0;

  return (
    <div className="overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.03)] transition-all duration-200 hover:border-gray-300 hover:shadow-[0_6px_18px_-10px_rgba(16,24,40,0.12)]">
      <button
        onClick={onToggleExpand}
        className="flex w-full items-center justify-between px-5 py-[18px] text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-xl bg-[#EEF3FF]">
            <Icon size={19} strokeWidth={2} color="#2F6FED" />
          </div>
          <div>
            <div className="mb-0.5 text-[15px] font-semibold tracking-tight text-gray-900">{module.title}</div>
            <div className="text-[12.5px] text-gray-400">{module.desc}</div>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3.5">
          <span
            className={`whitespace-nowrap rounded-full border px-[11px] py-[5px] text-[11.5px] font-semibold ${
              allOn
                ? "border-[#BBF0D2] bg-emerald-50 text-emerald-600"
                : noneOn
                ? "border-gray-200 bg-gray-50 text-gray-400"
                : "border-[#CBDCFF] bg-[#EEF3FF] text-[#2F6FED]"
            }`}
          >
            {enabledCount}/{totalCount} enabled
          </span>
          <span
            className={`flex text-gray-400 transition-transform duration-300 ease-in-out ${
              expanded ? "rotate-180 text-[#2F6FED]" : ""
            }`}
          >
            <ChevronDown size={17} strokeWidth={2.2} />
          </span>
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 gap-0.5 border-t border-gray-200 px-3.5 pb-4 pt-3 sm:grid-cols-2">
            {perms.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3.5 rounded-xl px-3 py-[11px] transition-colors duration-150 hover:bg-gray-50"
              >
                <div>
                  <div className="mb-0.5 text-[13.5px] font-medium text-gray-900">{p.label}</div>
                  <div className="text-xs leading-[1.4] text-gray-400">{p.desc}</div>
                </div>
                <ToggleSwitch checked={state[module.id]?.[p.id] || false} onChange={() => onToggle(module.id, p.id)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                           */
/* ------------------------------------------------------------------ */

export default function PermissionManagementPage() {
  const [activeRole, setActiveRole] = useState<RoleId>("admin");
  const [permState, setPermState] = useState<PermissionState>(buildDefaultState());
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(MODULES.slice(0, 3).map((m) => m.id)));
  const [query, setQuery] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("Never");
  const [updatedBy, setUpdatedBy] = useState<string>("None");
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (query.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpanded(new Set(MODULES.map((m) => m.id)));
    }
  }, [query]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setIsLoading(true);
        const { API } = await import("@/redux/Api");
        const response = await API.get("/rbac");
        if (response.data?.success && response.data.data) {
          const data = response.data.data;
          if (data.permState) {
            const defaults = buildDefaultState();
            const merged = { ...defaults };
            
            // Deep merge fetched permissions into defaults
            (["admin", "staff"] as RoleId[]).forEach((role) => {
              if (data.permState[role]) {
                Object.keys(data.permState[role]).forEach((modId) => {
                  if (merged[role][modId]) {
                    merged[role][modId] = {
                      ...merged[role][modId],
                      ...data.permState[role][modId]
                    };
                  }
                });
              }
            });
            setPermState(merged);
          }
          if (data.lastUpdated) setLastUpdated(data.lastUpdated);
          if (data.updatedBy) setUpdatedBy(data.updatedBy);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
        showToast("Failed to load permissions from server");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPermissions();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleModulePermission = (moduleId: string, permId: string) => {
    setPermState((prev) => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [moduleId]: {
          ...(prev[activeRole]?.[moduleId] || {}),
          [permId]: !(prev[activeRole]?.[moduleId]?.[permId] || false),
        },
      },
    }));
  };

  const setAll = (value: boolean) => {
    setPermState((prev) => {
      const roleState: RolePermState = {};
      MODULES.forEach((m) => {
        roleState[m.id] = {};
        m.permissions.forEach((p) => {
          roleState[m.id][p.id] = value;
        });
      });
      return { ...prev, [activeRole]: roleState };
    });
    showToast(value ? "All permissions selected" : "All permissions cleared");
  };

  const expandAll = () => setExpanded(new Set(MODULES.map((m) => m.id)));
  const collapseAll = () => setExpanded(new Set());

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedTime = formatNow();
      
      // ✅ Real user context yahan fetch karein
      const currentUser = auth.currentUser;
      const user = currentUser?.displayName || currentUser?.email || "System Admin"; 
      
      const { API } = await import("@/redux/Api");
      const response = await API.put("/rbac", {
        permState,
        lastUpdated: updatedTime,
        updatedBy: user
      });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to save permissions");
      }

      setLastUpdated(updatedTime);
      setUpdatedBy(user);
      showToast("Permissions saved successfully");
    } catch (error) {
      console.error("Error saving permissions:", error);
      showToast(error instanceof Error ? error.message : "Failed to save permissions");
    } finally {
      setSaving(false);
    }
  };
  const handleReset = () => {
    setPermState((prev) => {
      const defaults = buildDefaultState();
      return { ...prev, [activeRole]: defaults[activeRole] };
    });
    showToast("Permissions reset to default");
  };

  const activeModules = MODULES.filter((m) => {
    if (activeRole === "staff" && m.id === "staff") return false;
    return true;
  });

  const activeTotalPermissions = activeModules.reduce((n, m) => n + m.permissions.length, 0);

  const allowedCount = useMemo(
    () =>
      activeModules.reduce(
        (n, m) => n + m.permissions.filter((p) => permState[activeRole]?.[m.id]?.[p.id]).length,
        0
      ),
    [permState, activeRole, activeModules]
  );
  const restrictedCount = activeTotalPermissions - allowedCount;

  const visibleModules = MODULES.filter((m) => {
    // Hide 'staff' module completely for 'staff' role
    if (activeRole === "staff" && m.id === "staff") return false;
    
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    if (m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q)) return true;
    return m.permissions.some((p) => p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  });

  const activeRoleLabel = (ROLES.find((r) => r.id === activeRole) ?? ROLES[0]).label;

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-white">
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#2F6FED]"></div>
//           <p className="text-sm font-medium text-gray-500">Loading permissions...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-full bg-white text-gray-900">
      <div className="mx-auto p-6 md:p-12">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="mb-1.5 text-[30px] tracking-tight text-gray-900">
              Permission Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage access permissions for Lab Admin and Lab Staff across all modules.
            </p>
          </div>
          <div className="flex gap-2.5">
            <ResetButton text="Reset Permissions" onReset={handleReset} />
            <SubmitButton
              text={saving ? "Saving..." : "Save Changes"}
              type="button"
              onClick={handleSave}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Shield} label="Total Roles" value="2" sub="Roles configured" tint={STAT_TINTS[0]} />
          <StatCard icon={UserCircle} label="Active Role" value={activeRoleLabel} sub="Currently editing" tint={STAT_TINTS[1]} />
          <StatCard icon={Layers} label="Total Modules" value={activeModules.length} sub="Permission categories" tint={STAT_TINTS[2]} />
          <StatCard icon={KeyRound} label="Total Permissions" value={activeTotalPermissions} sub="Individual controls" tint={STAT_TINTS[3]} />
        </div>

        {/* Role switcher */}
        <div className="mb-6">
          <div className="relative inline-flex rounded-2xl border border-gray-200 bg-gray-50 p-1">
            <div
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-[10px] border border-gray-200 bg-white shadow-[0_2px_8px_rgba(16,24,40,0.10)] transition-all duration-300 ease-in-out ${
                activeRole === "admin" ? "left-1" : "left-[calc(50%+0px)]"
              }`}
            />
            {ROLES.map((r) => {
              const RIcon = r.icon;
              const active = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className={`relative z-10 flex items-center gap-2 whitespace-nowrap rounded-[10px] px-[26px] py-[10px] text-[13.5px] font-semibold transition-colors duration-[250ms] ${
                    active ? "text-[#2F6FED]" : "text-gray-500"
                  }`}
                >
                  <RIcon size={15} strokeWidth={2.2} />
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left column */}
          <div className="flex min-w-0 flex-col gap-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-3.5">
              <div className="flex min-w-[220px] flex-1 items-center gap-[9px] rounded-[11px] border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition-colors duration-200 focus-within:border-[#2F6FED] focus-within:bg-white">
                <Search size={15} className="text-gray-400" strokeWidth={2.2} />
                <input
                  placeholder="Search permissions..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-[13.5px] text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>
              <ToolbarButton icon={CheckSquare} label="Select All" onClick={() => setAll(true)} />
              <ToolbarButton icon={Square} label="Clear All" onClick={() => setAll(false)} />
              <ToolbarButton icon={ChevronsUpDown} label="Expand All" onClick={expandAll} />
              <ToolbarButton icon={ChevronsDownUp} label="Collapse All" onClick={collapseAll} />
            </div>

            {/* Modules */}
            {visibleModules.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[18px] border border-gray-200 bg-white px-5 py-[70px] text-center text-gray-400">
                <SearchX size={30} strokeWidth={1.6} className="mb-3.5 opacity-60" />
                <div className="mb-1 text-[14.5px] font-semibold text-gray-900">No permissions found</div>
                <div className="text-[13px]">Try a different search term, or clear the search to see all modules.</div>
              </div>
            ) : (
              visibleModules.map((m) => (
                <ModuleCard
                  key={m.id}
                  module={m}
                  state={permState[activeRole]}
                  onToggle={toggleModulePermission}
                  expanded={expanded.has(m.id)}
                  onToggleExpand={() => toggleExpand(m.id)}
                  query={query}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-[20px] border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
              <div className="mb-1 text-[14.5px] text-gray-900">Permission Summary</div>
              <div className="mb-1.5 text-[12.5px] text-gray-400">Snapshot of the selected role</div>

              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="flex items-center gap-[7px] text-[12.5px] font-medium text-gray-400">
                  <UserCircle size={14} /> Role name
                </span>
                <span className="text-[13.5px] font-semibold text-gray-900">{activeRoleLabel}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="flex items-center gap-[7px] text-[12.5px] font-medium text-emerald-600">
                  <Check size={14} /> Allowed permissions
                </span>
                <span className="text-[13.5px] font-semibold text-emerald-600">{allowedCount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="flex items-center gap-[7px] text-[12.5px] font-medium text-red-600">
                  <Square size={14} /> Restricted permissions
                </span>
                <span className="text-[13.5px] font-semibold text-red-600">{restrictedCount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="flex items-center gap-[7px] text-[12.5px] font-medium text-gray-400">
                  <Clock size={14} /> Last updated
                </span>
                <span className="text-[13.5px] font-semibold text-gray-900">{lastUpdated}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-[7px] text-[12.5px] font-medium text-gray-400">
                  <UserCog size={14} /> Updated by
                </span>
                <span className="text-[13.5px] font-semibold text-gray-900">{updatedBy}</span>
              </div>

              <SubmitButton
                text={saving ? "Saving..." : "Save Changes"}
                type="button"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-[9px] rounded-[13px] border border-gray-200 bg-white px-5 py-3 text-[13.5px] font-medium text-gray-900 shadow-[0_16px_40px_-12px_rgba(16,24,40,0.25)]">
          <Check size={15} className="text-[#2F6FED]" strokeWidth={2.4} />
          {toast}
        </div>
      )}
    </div>
  );
}