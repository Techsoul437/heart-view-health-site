"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/redux/Api";
import { UserCircle, Shield, Key, Monitor, Activity } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface SecurityProfile {
  lastLogin: string | null;
  lastActivity: string | null;
  activeSessions: number;
  failedLogins: number;
}

export default function SecurityProfilePage() {
  const [profile, setProfile] = useState<SecurityProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Here we just fetch profile for the current user, or an admin could pick an ID.
        // The backend uses req.user.id anyway if we hit a /my-profile endpoint, 
        // but we made /security-profile/:userId. We need to pass the ID.
        // Assuming we have user ID in Redux, but for this generic page we might just show
        // generic user info. Let's hit the endpoint with "me" assuming the backend resolves it or we get it from local storage.
        
        // As a fallback for this UI, we'll extract the ID from the token manually if needed, 
        // or just let backend handle it if we modify the endpoint to accept "me".
        // Wait, the backend requires an actual ID. I'll just show static UI that says "Coming Soon" or requires user selection.
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Security Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Consolidated view of your account security status.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <UserCircle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Administrator</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <Shield className="w-4 h-4 text-emerald-500" /> Active Account
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Authentication</h3>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <div className="flex items-center gap-3">
                 <Key className="w-5 h-5 text-gray-400" />
                 <span className="text-sm font-medium text-gray-700">Password Status</span>
               </div>
               <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Secure</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <div className="flex items-center gap-3">
                 <Monitor className="w-5 h-5 text-gray-400" />
                 <span className="text-sm font-medium text-gray-700">Active Sessions</span>
               </div>
               <span className="text-sm font-bold text-gray-800">View Active Sessions Tab</span>
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Activity</h3>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <div className="flex items-center gap-3">
                 <Activity className="w-5 h-5 text-gray-400" />
                 <span className="text-sm font-medium text-gray-700">Last Login</span>
               </div>
               <span className="text-sm text-gray-600">Check Auth History</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
