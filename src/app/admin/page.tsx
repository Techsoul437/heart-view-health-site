"use client"
import WebAdminLogin from '@/components/admin/login/WebAdminLogin';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("admin_accessToken")
    if (token) {
      router.push("/admin/dashboard")
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
    }
  }, [router])

  if (loading) return null;

  return <WebAdminLogin />;
}
