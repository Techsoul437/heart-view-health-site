"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { API } from "@/redux/Api";
import toast from "react-hot-toast";

interface PermissionGuardProps {
    moduleName: string;
    permissionName: string;
    children: React.ReactNode;
}

export default function PermissionGuard({ moduleName, permissionName, children }: PermissionGuardProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const role = pathname.split("/")[1]; // lab-admin or lab-staff

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const response = await API.get("/rbac");
                if (response.data?.success && response.data.data) {
                    const data = response.data.data;
                    const userRole = role === "lab-staff" ? "staff" : "admin";
                    const permState = data.permState?.[userRole];
                    
                    if (permState && permState[moduleName] && permState[moduleName][permissionName] === true) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Error fetching permissions:", error);
                setIsAuthorized(false);
            }
        };

        checkPermission();
    }, [moduleName, permissionName, role]);

    useEffect(() => {
        if (isAuthorized === false) {
            toast.error("You do not have permission to access this page.");
            router.push(`/${role}/dashboard`);
        }
    }, [isAuthorized, router, role]);

    if (isAuthorized === null) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
            </div>
        );
    }

    return isAuthorized ? <>{children}</> : null;
}
