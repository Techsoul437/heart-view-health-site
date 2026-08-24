"use client"
import AdminLoginPage from '@/components/admin/login/MainAdminLogin'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("heartviewAdmin_accessToken")
    if (token) {
      router.push("/heartview-admin/dashboard")
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
    }
  }, [router])

  if (loading) return null;

  return (
    <div>
     <AdminLoginPage></AdminLoginPage>
    </div>
  )
}

export default Page
